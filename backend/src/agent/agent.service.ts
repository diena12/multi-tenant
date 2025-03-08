import { Injectable } from '@nestjs/common';
import { Agent } from './agent.model';

@Injectable()
export class AgentService {
  private agents: Agent[] = [];
}
