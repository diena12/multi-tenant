"use client";

const features = [
  {
    title: "フロントエンド",
    description: "React, Vue.js, Angularなど最新のフレームワーク情報",
  },
  {
    title: "バックエンド",
    description: "Node.js, NestJS, GraphQLなどのサーバーサイド技術",
  },
  {
    title: "パフォーマンス",
    description: "アプリケーションの最適化とベストプラクティス",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Features Section */}
      <section className="border-t border-gray-100 bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            技術カテゴリー
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md"
              >
                <div className="mb-4 inline-block rounded-full bg-primary/10 p-3 text-primary">
                  あああ
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            最新の記事
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((_, index) => (
              <article
                key={index}
                className="overflow-hidden rounded-lg bg-white shadow-sm transition duration-300 hover:shadow-md"
              >
                <div className="relative h-48"></div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    技術記事のタイトル {index + 1}
                  </h3>
                  <p className="mb-4 text-gray-600">
                    最新の技術トレンドや開発テクニックについての詳細な解説記事です。
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      2024年4月{index + 1}日
                    </span>
                    <button className="text-sm font-medium text-primary transition hover:text-primary/80">
                      続きを読む
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
