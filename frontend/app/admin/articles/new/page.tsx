"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { MarkdownEditor } from "@/components/MarkdownEditor";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export default function NewArticle() {
  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/articles"
          className="mb-4 inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          記事一覧に戻る
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">新規記事作成</h1>
      </div>

      <Card className="p-6">
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">タイトル</Label>
            <Input id="title" placeholder="記事のタイトルを入力" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">本文</Label>
            {/* <Textarea
              id="content"
              placeholder="記事の本文を入力"
              className="min-h-[400px]"
            /> */}
          </div>
          <div className="not-prose">
            <MarkdownEditor />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>カテゴリー</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="カテゴリーを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">フロントエンド</SelectItem>
                  <SelectItem value="backend">バックエンド</SelectItem>
                  <SelectItem value="infrastructure">インフラ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>ステータス</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="ステータスを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">下書き</SelectItem>
                  <SelectItem value="published">公開</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">キャンセル</Button>
            <Button>作成</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
