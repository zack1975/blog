import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class BlogPost {
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop()
  author: string;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
