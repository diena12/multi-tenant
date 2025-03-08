import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService], // 他のモジュールでも使えるようにエクスポート
})
export class MailModule {}
