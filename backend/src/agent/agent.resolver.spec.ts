import { Test, TestingModule } from '@nestjs/testing';
import { AgentResolver } from './agent.resolver';

describe('AgentResolver', () => {
  let resolver: AgentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentResolver],
    }).compile();

    resolver = module.get<AgentResolver>(AgentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
