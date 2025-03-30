import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Agent } from 'src/agent/agent.model';
import { RegisterDto } from './dto/register.dto';
import { VerifyCodeAgentDto } from './dto/verify-code.dto';
import { Role } from '@prisma/client';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async registerHelper(@Args() RegisterDto: RegisterDto): Promise<string> {
    const user = await this.authService.register(
      RegisterDto.email,
      RegisterDto.password,
      Role.HELPER,
    );
    return user.id;
  }

  @Mutation(() => String)
  async registerAgent(@Args() RegisterDto: RegisterDto): Promise<string> {
    const user = await this.authService.register(
      RegisterDto.email,
      RegisterDto.password,
      Role.AGENT,
    );
    return user.id;
  }

  @Mutation(() => Agent)
  async verifyCodeAgent(
    @Args() VerifyCodeAgentDto: VerifyCodeAgentDto,
  ): Promise<Agent> {
    return this.authService.verifyCodeAgent(
      VerifyCodeAgentDto.email,
      VerifyCodeAgentDto.code,
    );
  }
}
