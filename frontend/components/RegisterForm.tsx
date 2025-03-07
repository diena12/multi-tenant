"use client";

import { useState } from "react";

interface RegisterFormProps {
  role: "admin" | "agent" | "helper";
}

export default function RegisterForm({ role }: RegisterFormProps) {
  const isAdmin = role === "admin";
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    adminKey: "", // 管理者のみ
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = `/api/${role}/register`;

    const payload = isAdmin
      ? form
      : { username: form.username, email: form.email, password: form.password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    setMessage(
      res.ok ? `${role} 登録成功！` : result.message || "登録に失敗しました"
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">新規登録</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="メールアドレス"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="パスワード"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          {isAdmin && (
            <input
              name="adminKey"
              type="password"
              placeholder="管理者キー"
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            登録
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
