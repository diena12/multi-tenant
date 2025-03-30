"use client";

import { Card } from "@/components/ui/card";

const stats = [
  {
    name: "総記事数",
    value: "24",
    trend: "+4.75%",
  },
  {
    name: "月間PV",
    value: "12.4k",
    trend: "+10.2%",
  },
  {
    name: "ユーザー数",
    value: "2.1k",
    trend: "+2.4%",
  },
  {
    name: "平均滞在時間",
    value: "3.2分",
    trend: "+1.2%",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gray-900">ダッシュボード</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary/10 p-3"></div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="ml-2 text-sm font-medium text-green-600">
                    {stat.trend}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
