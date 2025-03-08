"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PreVerifyPage() {
  const router = useRouter();
  const searchParamas = useSearchParams();
  const email = searchParamas.get("email") || "";

  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">本人確認</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="4桁の確認コード"
            onChange={(e) => setCode(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          ></button>
        </form>
      </div>
    </div>
  );
}
