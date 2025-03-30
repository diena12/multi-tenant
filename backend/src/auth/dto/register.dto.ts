import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@ArgsType()
export class RegisterDto {
  @Field()
  @IsEmail({}, { message: '正しいメールアドレスを入力してください' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'パスワードは必須です' })
  @MinLength(6, { message: 'パスワードは6文字以上である必要があります' })
  password: string;
}
