"use client";

import {
  ChartBarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    name: "総記事数",
    value: "1,234",
    change: "+12%",
    changeType: "positive",
    icon: DocumentTextIcon,
  },
  {
    name: "アクティブユーザー",
    value: "5,678",
    change: "+8%",
    changeType: "positive",
    icon: UserGroupIcon,
  },
  {
    name: "ページビュー",
    value: "89,012",
    change: "+15%",
    changeType: "positive",
    icon: ChartBarIcon,
  },
  {
    name: "コンバージョン率",
    value: "3.2%",
    change: "+2.1%",
    changeType: "positive",
    icon: ArrowTrendingUpIcon,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">ダッシュボード</h1>
        <div className="flex items-center space-x-4">
          <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            新規記事作成
          </button>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon
                  className="h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* アクティビティセクション */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">
            最近のアクティビティ
          </h2>
          <div className="mt-6 flow-root">
            <ul role="list" className="-mb-8">
              {[1, 2, 3, 4, 5].map((item, itemIdx) => (
                <li key={item}>
                  <div className="relative pb-8">
                    {itemIdx !== 4 ? (
                      <span
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white">
                          <UserGroupIcon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            新しいユーザーが登録されました
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <time dateTime="2024-03-20">1時間前</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
