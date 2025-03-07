import { Module } from '@nestjs/common';
import { AgentResolver } from './agent.resolver';
import { AgentService } from './agent.service';
import { AgentRepository } from './agent.repository';

@Module({
  providers: [AgentResolver, AgentService, AgentRepository],
  exports: [AgentService],
})
export class AgentModule {}
