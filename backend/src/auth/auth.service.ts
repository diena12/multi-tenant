import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
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

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    this.verificationCodes.set(email, verificationCode);

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    try {
      const user = await this.userRepository.create(
        email,
        hashedPassword,
        verificationCode,
        expiresAt,
      );

      await this.mailService.sendPreVerificationEmail(email, verificationCode);
      const token = this.jwtService.sign({ email });

      return { id: user.id, email: user.email, token: token };
    } catch (error) {
      throw new UnauthorizedException('登録に失敗しました');
    }
  }

  async verifyCode(email: string, code: string) {
    try {
      const user = await this.userRepository.findByEmail(email);

      if (!user || user.verificationCode !== code) {
        throw new UnauthorizedException('認証に失敗しました');
      }

      // JWT payload に入れる情報
      const payload = {
        sub: user.id,
        email: user.email,
      };
      const token = this.jwtService.sign(payload);
      return { token };
    } catch (error) {
      throw new UnauthorizedException('登録に失敗しました');
    }
  }

  async loginAgent(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(
        'メールアドレスまたはパスワードが間違っています',
      );
    }

    // JWT トークンを発行
    const token = this.jwtService.sign({
      agentId: user.id,
      email: user.email,
    });

    return { token };
  }
}
