import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogPostDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsString()
  readonly author: string;
}
