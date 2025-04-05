import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { VerifyCodeAgentDto } from './dto/verify-code.dto';
import { User } from 'src/user/user.model';
import { LoginDto } from './dto/login.dto';
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello world!';
  }

  @Mutation(() => User)
  async registerUser(@Args() RegisterDto: RegisterDto): Promise<User> {
    const user = await this.authService.register(
      RegisterDto.email,
      RegisterDto.password,
    );
    return user;
  }

  @Mutation(() => User)
  async verifyCode(
    @Args() VerifyCodeAgentDto: VerifyCodeAgentDto,
  ): Promise<{ token: string }> {
    return this.authService.verifyCode(
      VerifyCodeAgentDto.email,
      VerifyCodeAgentDto.code,
    );
  }

  @Mutation(() => User)
  async loginUser(@Args() LoginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(LoginDto.email, LoginDto.password);
  }
}
