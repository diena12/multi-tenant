import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Agent {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  token?: string;

  @Field()
  verificationCode: string;

  @Field()
  verificationExpires: Date;
}
