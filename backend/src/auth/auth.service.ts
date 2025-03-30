import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
    private userRepository: UserRepository,
  ) {}

  private verificationCodes = new Map<string, string>();

  async register(email: string, password: string, role: Role) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    this.verificationCodes.set(email, verificationCode);

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    try {
      const user = await this.userRepository.create(
        email,
        hashedPassword,
        role,
        verificationCode,
        expiresAt,
      );

      await this.mailService.sendPreVerificationEmail(email, verificationCode);
      const token = this.jwtService.sign({ email });

      return { id: user.id, email: user.email, role: user.role, token: token };
    } catch (error) {
      throw new UnauthorizedException('登録に失敗しました');
    }
  }

  async verifyCode(email: string, code: string) {
    try {
      const agent = await this.agentRepository.findByEmail(email);

      if (!agent) {
        return false;
      }
      if (agent.verificationCode !== code) {
        return false;
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('登録に失敗しました');
    }
  }

  async loginAgent(email: string, password: string) {
    const agent = await this.agentRepository.findByEmail(email);

    if (!agent || !(await bcrypt.compare(password, agent.password))) {
      throw new UnauthorizedException(
        'メールアドレスまたはパスワードが間違っています',
      );
    }

    // JWT トークンを発行
    const token = this.jwtService.sign({
      agentId: agent.id,
      email: agent.email,
    });

    return { token };
  }
}
