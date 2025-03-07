import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Agent } from 'src/agent/agent.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Agent)
  async registerAgent(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<Agent> {
    return this.authService.registerAgent(email, password);
  }
}
