import { Injectable } from '@nestjs/common';
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
}
