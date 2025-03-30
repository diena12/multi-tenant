"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigation = [
    { name: "ダッシュボード", href: "/admin" },
    { name: "記事管理", href: "/admin/articles" },
    { name: "ユーザー管理", href: "/admin/users" },
    { name: "設定", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed h-full w-64 border-r border-gray-200 bg-white">
          <div className="flex h-16 items-center border-b border-gray-200 px-6">
            <Link href="/admin" className="text-lg font-bold text-gray-900">
              管理画面
            </Link>
          </div>
          <nav className="space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className="ml-64 flex-1 p-8">{children}</div>
      </div>
    </div>
  );
}
