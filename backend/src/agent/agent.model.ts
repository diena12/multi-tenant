import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Agent {
  @Field()
  id: string;

  @Field()
  email: string;
}
