import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Agent } from 'src/agent/agent.model';
import { RegisterAgentDto } from './dto/register.dto';
import { VerifyCodeAgentDto } from './dto/verify-code.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Agent)
  async registerAgent(
    @Args() RegisterAgentDto: RegisterAgentDto,
  ): Promise<Agent> {
    return this.authService.registerAgent(
      RegisterAgentDto.email,
      RegisterAgentDto.password,
    );
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
