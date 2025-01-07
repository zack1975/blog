import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostsService } from './posts.service';

describe('PostsService', () => {
  let service: BlogPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogPostsService],
    }).compile();

    service = module.get<BlogPostsService>(BlogPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
