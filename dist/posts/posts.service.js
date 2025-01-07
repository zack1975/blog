"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const blogpost_schema_1 = require("./schemas/blogpost.schema");
let BlogPostsService = class BlogPostsService {
    constructor(blogPostModel) {
        this.blogPostModel = blogPostModel;
    }
    async findAll(query) {
        const keyword = query.author
            ? {
                author: query.author,
            }
            : {};
        const sort = query.author ? { createdAt: 1 } : {};
        const itemsPerPage = Number(query.limit) || 10;
        const currentPage = Number(query.offset) || 1;
        const skip = (currentPage - 1) * itemsPerPage;
        const posts = await this.blogPostModel
            .find({ ...keyword })
            .limit(itemsPerPage)
            .skip(skip)
            .sort(sort);
        return posts;
    }
    async findById(id) {
        if (!mongoose.isValidObjectId(id)) {
            throw new common_1.NotFoundException('Invalid ID format, please enter a valid ID');
        }
        const blogPost = await this.blogPostModel.findById(id);
        if (!blogPost) {
            throw new common_1.NotFoundException('Post not found');
        }
        return blogPost;
    }
    async create(post) {
        return await this.blogPostModel.create(post);
    }
    async updateById(id, blogPost) {
        return await this.blogPostModel.findByIdAndUpdate(id, blogPost, {
            new: true,
            runValidators: true,
        });
    }
    async deleteById(id) {
        return await this.blogPostModel.findByIdAndDelete(id);
    }
};
exports.BlogPostsService = BlogPostsService;
exports.BlogPostsService = BlogPostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blogpost_schema_1.BlogPost.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], BlogPostsService);
//# sourceMappingURL=posts.service.js.map