import { Injectable } from '@nestjs/common';
import { Agent } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AgentRepository {
  constructor(private prisma: PrismaService) {}

  async create(email: string, hashedPassword: string) {
    return this.prisma.agent.create({
      data: { email, password: hashedPassword },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.agent.findUnique({ where: { email } });
  }

  async saveVerificationCode(agent: Agent, code: string, expiresAt: Date) {
    await this.prisma.agent.update({
      where: { id: agent.id }, // すでに取得した `agent` を使う
      data: {
        verificationCode: code,
        verificationExpires: expiresAt,
      },
    });
  }
}
