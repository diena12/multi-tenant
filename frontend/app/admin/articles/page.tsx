"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "Next.js 13の新機能について",
    status: "公開中",
    date: "2024-04-01",
    views: 1234,
  },
  {
    id: 2,
    title: "TypeScriptの型システム入門",
    status: "下書き",
    date: "2024-04-02",
    views: 567,
  },
  {
    id: 3,
    title: "Reactのベストプラクティス",
    status: "公開中",
    date: "2024-04-03",
    views: 890,
  },
];

export default function ArticleList() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">記事一覧</h1>
        <Link href="/admin/articles/new">
          <Button>新規作成</Button>
        </Link>
      </div>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>タイトル</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>公開日</TableHead>
              <TableHead>閲覧数</TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      article.status === "公開中"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {article.status}
                  </span>
                </TableCell>
                <TableCell>{article.date}</TableCell>
                <TableCell>{article.views.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/admin/articles/${article.id}/edit`}>
                      <Button variant="ghost" size="icon"></Button>
                    </Link>
                    <Button variant="ghost" size="icon"></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
