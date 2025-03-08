import { Module } from '@nestjs/common';
import { AgentResolver } from './agent.resolver';
import { AgentService } from './agent.service';
import { AgentRepository } from './agent.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AgentResolver, AgentService, AgentRepository],
  exports: [AgentService, AgentRepository],
})
export class AgentModule {}
