"use client";

import { useRegisterAgentMutation } from "@/src/graphql/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface RegisterFormProps {
  role: "admin" | "agent" | "helper";
}

const registerSchema = z.object({
  email: z.string().email("メールアドレスの形式が正しくありません。"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください。"),
  adminKey: z.string().optional(),
});

export default function RegisterForm({ role }: RegisterFormProps) {
  const isAdmin = role === "admin";
  const router = useRouter();
  const [message, setMessage] = useState("");

  const [registerAgent] = useRegisterAgentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    if (role === "agent") {
      try {
        const res = await registerAgent({
          variables: { email: data.email, password: data.password },
        });

        if (res.data?.registerAgent.token) {
          localStorage.setItem("token", res.data.registerAgent.token);
          localStorage.setItem("email", res.data.registerAgent.email);

          router.push("/agent/pre-verify");
        }
      } catch (err) {
        setMessage("登録に失敗しました");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">新規登録</h2>
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
          {isAdmin && (
            <input
              {...register("adminKey")}
              name="adminKey"
              type="password"
              placeholder="管理者キー"
              className="border p-2 w-full rounded"
            />
          )}
          {errors.adminKey && (
            <p className="text-red-500">{errors.adminKey.message}</p>
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
