import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@ArgsType()
export class VerifyCodeAgentDto {
  @Field()
  email: string;

  @Field()
  @IsNotEmpty({ message: '確認コードは必須です' })
  @MinLength(4, { message: '確認コードは4桁で入力してください。' })
  code: string;
}
