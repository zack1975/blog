import { IsOptional, IsString } from 'class-validator';

export class UpdateBlogPostDto {
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly content: string;

    @IsOptional()
    @IsString()
    readonly author: string;
}
