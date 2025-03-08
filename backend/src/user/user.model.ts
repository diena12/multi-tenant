import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Agent {
  @Field()
  id: string;
  @Field()
  email: string;
  @Field({ nullable: true })
  token?: string;
}

@ObjectType()
export class Helper {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;
}

@ObjectType()
export class Admin {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;
}
