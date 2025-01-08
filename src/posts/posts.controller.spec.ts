import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { BlogPostsService } from './posts.service';

const singlePost = {
  _id: '677d226547d9d95fb1e88dbc',
  title: 'Creating a new Post',
  content: 'This is a short text',
  author: 'Andrea Zucca',
  createdAt: '2025-01-07T12: 47: 33.052Z',
  updatedAt: '2025-01-07T12: 47: 33.052Z',
};

const mockBlogPost = [
  {
    _id: '677d226547d9d95fb1e88dbd',
    title: 'The first blog post',
    content: 'This is the first blog post content, a short text to define the process',
    author: 'Andrea Zucca',
    createdAt: '2025-01-07T12: 47: 33.052Z',
    updatedAt: '2025-01-07T12: 47: 33.052Z',
  },
  {
    _id: '677d22a647d9d95fb1e88dbf',
    title: 'The second blog post',
    content: 'This is the second blog post content',
    author: 'Andrea Zucca',
    createdAt: '2025-01-07T12: 48: 38.789Z',
    updatedAt: '2025-01-07T12: 48: 38.789Z',
  },
  {
    _id: '677d22b247d9d95fb1e88dc1',
    title: 'The third blog post',
    content: 'This is the third blog post content',
    author: 'Andrea Zucca',
    createdAt: '2025-01-07T11: 48: 50.905Z',
    updatedAt: '2025-01-07T12: 48: 50.905Z',
  },
  {
    _id: '677d3bd5257b11d3af65bcc8',
    title: 'The fourth blog post',
    content: 'This is the fourth blog post content',
    author: 'Lady Writer',
    createdAt: '2025-01-07T14: 36: 05.845Z',
    updatedAt: '2025-01-07T14: 36: 05.845Z',
  },
  {
    _id: '677d3be1257b11d3af65bcca',
    title: 'The fifth blog post',
    content: 'This is the fifth blog post content',
    author: 'Lady Writer',
    createdAt: '2025-01-07T14: 36: 17.123Z',
    updatedAt: '2025-01-07T14: 36: 17.123Z',
  },
];

const mockBlogPostService = {
  findAll: jest.fn().mockResolvedValueOnce(mockBlogPost),
  create: jest.fn(),
  findById: jest.fn().mockResolvedValueOnce(singlePost),
  findByIdAndUpdate: jest.fn(),
  deleteById: jest.fn().mockResolvedValueOnce(true),
};

describe('PostsController', () => {
  let controller: PostsController;
  let service: BlogPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: BlogPostsService,
          useValue: mockBlogPostService,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<BlogPostsService>(BlogPostsService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listBlogPosts', () => {
    it('should return all blog posts', async () => {
      const result = await controller.listBlogPosts({});

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toBe(mockBlogPost);
    });
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const newPost = {
        title: 'Creating a new Post',
        content: 'This is a short text',
        author: 'Andrea Zucca',
      };

      mockBlogPostService.create = jest.fn().mockResolvedValueOnce(singlePost);

      const result = await controller.createBlogPost(newPost);
      expect(service.create).toHaveBeenCalled();
      expect(result).toEqual(singlePost);
    });
  });

  describe('getBlogPostById', () => {
    it('should get a post by id', async () => {
      const result = await controller.getBlogPostById(singlePost._id);
      expect(service.findById).toHaveBeenCalled();
      expect(result).toEqual(singlePost);
    });
  });

  describe('updateBlogPost', () => {
    it('should update a post by id', async () => {
      const blogPost = { ...singlePost, title: 'New Test Title' };
      const newTitle = { title: 'New Test Title' };

      mockBlogPostService.findById = jest.fn().mockResolvedValueOnce(blogPost);
      mockBlogPostService.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValueOnce(blogPost);
      const result = await controller.updateBlogPost(
        singlePost._id as any,
        newTitle as any,
      );
      expect(service.findById).toHaveBeenCalled();
      expect(service.findByIdAndUpdate).toHaveBeenCalled();
      expect(result).toEqual(blogPost);
    });
  });

  describe('deleteBlogPost', () => {
    it('should delete a post by id', async () => {

      mockBlogPostService.findById = jest
        .fn()
        .mockResolvedValueOnce(singlePost);

      const result = await controller.deleteBlogPost(singlePost._id);
      expect(service.findById).toHaveBeenCalled();
      expect(service.deleteById).toHaveBeenCalled();
      expect(result).toEqual({ deleted: true });
    });
  });
});
