"use client";

import { useVerifyCodeMutation } from "@/src/graphql/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const verifySchema = z.object({
  code: z.string().length(4, "確認コードは4桁で入力してください。"),
});

export default function PreVerifyPage() {
  const router = useRouter();
  const searchParamas = useSearchParams();
  const email = searchParamas.get("email") || "";

  const [message, setMessage] = useState("");
  const [verifyCode] = useVerifyCodeMutation();

  // react-hook-form の設定
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: { code: string }) => {
    try {
      // APIリクエスト（GraphQL の場合は useMutation で送信）
      await verifyCode({
        variables: { email, code: data.code },
      });

      // 成功時にリダイレクト
      router.push("/dashboard");
    } catch {
      setMessage("確認に失敗しました。もう一度お試しください。");
    }
  };

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
          ></button>
        </form>
      </div>
    </div>
  );
}
