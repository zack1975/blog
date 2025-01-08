import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostsService } from './posts.service';
import { BlogPost } from './schemas/blogpost.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockBlogPostService = {
  find: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

const singlePost = {
  _id: '677d226547d9d95fb1e88dbc',
  title: 'Creating a new Post',
  content: 'This is a short text',
  author: 'Andrea Zucca',
  createdAt: '2025-01-07T12: 47: 33.052Z',
  updatedAt: '2025-01-07T12: 47: 33.052Z',
}

const mockBlogPost = [
  {
    _id: '677d226547d9d95fb1e88dbd',
    title: 'The first blog post',
    content:
      'This is the first blog post content, a short text to define the process',
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
  }
];

describe('PostsService', () => {
  let service: BlogPostsService;
  let model: Model<BlogPost>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogPostsService,
        {
          provide: getModelToken(BlogPost.name),
          useValue: mockBlogPostService,
        },
      ],
    }).compile();

    service = module.get<BlogPostsService>(BlogPostsService);
    model = module.get<Model<BlogPost>>(getModelToken(BlogPost.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Model should be defined', () => {
    expect(model).toBeDefined();
  });

  describe('findAll', () => {
    it('Return a list of posts', async () => {
      jest.spyOn(model, 'find').mockImplementationOnce(
        () =>
          ({
            limit: () => ({
              skip: () => ({
                sort: jest.fn().mockResolvedValue(mockBlogPost),
              }),
            }),
          }) as any,
      );

      const blogPosts = await service.findAll({});

      expect(blogPosts).toEqual(mockBlogPost);
      expect(blogPosts).toHaveLength(5);
    });
  });

  describe('create', () => {
    it('create a new post', async () => {
      const newPost = {
        title: 'Creating a new Post',
        content: 'This is a short text',
        author: 'Andrea Zucca',
      };
      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(singlePost as any));
      const blogPost = await service.create(newPost as any);
      expect(blogPost).toEqual(singlePost);
    });
  });

  describe('findById', () => {
    it('should get post by ID', async () => {
      jest.spyOn(model, 'findById').mockResolvedValueOnce(singlePost as any);
      const blogPost = await service.findById(singlePost._id);
      expect(blogPost).toEqual(singlePost);
    });

    it('should throw wrong mongoose id error', async () => {
      await expect(service.findById('wrongId')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw wrong mongoose id error', async () => {
      await expect(service.findById('wrongId')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw post not found error', async () => {
      const mockError = new NotFoundException('Post not found');
      jest.spyOn(model, 'findById').mockRejectedValue(mockError);
      await expect(service.findById(singlePost._id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByIdAndUpdate', () => {
    it('should update the post', async () => {
      const blogPost = { ...singlePost, title: 'New Test Title' };
      const newTitle = { title: 'New Test Title'};
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockResolvedValueOnce(blogPost as any);
      const result = await service.findByIdAndUpdate(
        blogPost._id,
        newTitle as any,
      );
      expect(result).toEqual(blogPost);
    });
  });

  describe('deleteById', () => {
    it('should delete the post', async () => {
      const response = { deleted: true };
      jest
        .spyOn(model, 'findByIdAndDelete')
        .mockResolvedValueOnce(response as any);
      const result = await service.deleteById(singlePost._id);
      expect(result).toEqual(response);
    });
  });
});
