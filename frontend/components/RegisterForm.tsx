"use client";

import { useRegisterAgentMutation } from "@/src/graphql/generated";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RegisterFormProps {
  role: "admin" | "agent" | "helper";
}

export default function RegisterForm({ role }: RegisterFormProps) {
  const isAdmin = role === "admin";
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    adminKey: "", // 管理者のみ
  });
  const [message, setMessage] = useState("");

  const [registerAgent, { data, error }] = useRegisterAgentMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "agent") {
      try {
        const res = await registerAgent({
          variables: { email: form.email, password: form.password },
        });

        if (res.data?.registerAgent.token) {
          localStorage.setItem("token", res.data.registerAgent.token);
          localStorage.setItem("email", res.data.registerAgent.email);

          router.push("/agent/pre-verify");
        }
      } catch (err) {
        setMessage("登録に失敗しました");
      }
    } else {
      setMessage("現在、GraphQL は agent のみ対応しています");
    }
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
