import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    email: string,
    hashedPassword: string,
    role: Role,
    code: string,
    expiresAt: Date,
  ) {
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        verificationCode: code,
        verificationExpires: expiresAt,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async saveVerificationCode(user: User, code: string, expiresAt: Date) {
    await this.prisma.user.update({
      where: { id: user.id }, // すでに取得した `agent` を使う
      data: {
        verificationCode: code,
        verificationExpires: expiresAt,
      },
    });
  }
}
