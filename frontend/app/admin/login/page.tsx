"use client";

import { useLoginUserMutation } from "@/src/graphql/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("メールアドレスの形式が正しくありません。"),
  password: z.string().min(1, "パスワードを入力してください。"),
});

export default function AdminLoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const [login] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      if (res.data?.loginUser.token) {
        // トークンをCookieに保存
        document.cookie = `token=${res.data.loginUser.token}; path=/; max-age=86400`; // 24時間有効
        // メールアドレスをlocalStorageに保存
        localStorage.setItem("email", data.email);
        // ダッシュボードにリダイレクト
        router.push("/admin/dashboard");
      }
    } catch {
      setMessage("メールアドレスまたはパスワードが間違っています");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">管理者ログイン</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("email")}
            type="email"
            placeholder="メールアドレス"
            className="border p-2 w-full rounded"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            {...register("password")}
            type="password"
            placeholder="パスワード"
            className="border p-2 w-full rounded"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
          >
            ログイン
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        <div className="mt-4 text-center">
          <Link
            href="/admin/register"
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            新規登録はこちら
          </Link>
        </div>
      </div>
    </div>
  );
}
