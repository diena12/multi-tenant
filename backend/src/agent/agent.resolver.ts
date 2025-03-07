import { Query, Resolver } from '@nestjs/graphql';
import { AgentService } from './agent.service';

@Resolver()
export class AgentResolver {
  constructor(private readonly agentService: AgentService) {}
  @Query(() => String)
  hello(): string {
    return 'Hello, GraphQL!';
  }
}
