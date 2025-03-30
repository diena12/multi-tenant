import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

export enum Role {
  AGENT = 'AGENT',
  HELPER = 'HELPER',
}

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
export class User {
  @Field()
  id: string;
  @Field()
  email: string;
  @Field({ nullable: true })
  token?: string;
  @Field(() => Role)
  role: Role;
}
