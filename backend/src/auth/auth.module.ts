import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { AgentModule } from 'src/agent/agent.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
    AgentModule,
    MailModule,
  ],
  providers: [AuthService, PrismaService, JwtStrategy, AuthResolver],
})
export class AuthModule {}
