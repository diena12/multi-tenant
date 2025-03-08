import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS を許可
  app.enableCors({
    origin: 'http://localhost:3000', // フロントエンドのURLを指定
    credentials: true, // クッキーや認証情報を送信する場合
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
