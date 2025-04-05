"use client";

import { useVerifyCodeMutation } from "@/src/graphql/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const verifySchema = z.object({
  code: z.string().length(4, "確認コードは4桁で入力してください。"),
});

export default function PreVerifyPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [verifyCode] = useVerifyCodeMutation();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      router.push("/admin/login");
      return;
    }
    setEmail(storedEmail);
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: { code: string }) => {
    try {
      const result = await verifyCode({
        variables: { email, code: data.code },
      });

      if (result.data?.verifyCode.token) {
        // トークンをCookieに保存
        document.cookie = `token=${result.data.verifyCode.token}; path=/; max-age=86400`; // 24時間有効
        // 成功時にリダイレクト
        router.push("/admin/dashboard");
      } else {
        setMessage("トークンの取得に失敗しました。もう一度お試しください。");
      }
    } catch {
      setMessage("確認に失敗しました。もう一度お試しください。");
    }
  };

  if (!email) {
    return null; // メールアドレスが取得できるまで何も表示しない
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">本人確認</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("code")}
            type="text"
            placeholder="4桁の確認コード"
            className="border p-2 w-full rounded"
          />
          {errors.code && (
            <p className="text-red-500 text-center">{errors.code.message}</p>
          )}
          {message && <p className="text-red-500 text-center">{message}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            確認
          </button>
        </form>
      </div>
    </div>
  );
}
