import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AgentRepository } from 'src/agent/agent.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private agentRepository: AgentRepository,
  ) {}

  async registerAgent(email: string, password: string) {
    const hashedPassword: string = await bcrypt.hash(password, 10);

    try {
      const agent = await this.agentRepository.create(email, hashedPassword);

      return { id: agent.id, email: agent.email };
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
