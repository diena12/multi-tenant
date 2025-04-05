"use client";

import { useRegisterUserMutation } from "@/src/graphql/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email("メールアドレスの形式が正しくありません。"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください。"),
});

export default function AdminLoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const [registerUser] = useRegisterUserMutation(); // Admin用に変更

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      const res = await registerUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      if (res.data?.registerUser.token) {
        localStorage.setItem("token", res.data.registerUser.token);
        localStorage.setItem("email", res.data.registerUser.email);

        router.push("/admin/pre-verify");
      }
    } catch {
      setMessage("登録に失敗しました");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">管理者登録</h2>
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
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            登録
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}
