import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { BlogPost, BlogResponse } from '@/types/blog';

interface GetBlogPostsParams {
  page?: number;
  category?: string;
  tag?: string;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

export async function getBlogPosts({
  page = 1,
  category,
  tag,
}: GetBlogPostsParams = {}): Promise<BlogResponse> {
  try {
    // 读取所有博客文件
    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        ...data,
        content,
      } as BlogPost;
    });

    // 过滤和分页
    let filteredPosts = allPosts;
    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }
    if (tag) {
      filteredPosts = filteredPosts.filter(post => post.tags.includes(tag));
    }

    // 计算分页
    const postsPerPage = 9;
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const paginatedPosts = filteredPosts.slice(start, end);

    // 收集所有分类和标签
    const categories = Array.from(new Set(allPosts.map(post => post.category)));
    const tags = Array.from(new Set(allPosts.flatMap(post => post.tags)));

    return {
      items: paginatedPosts,
      categories,
      tags,
      totalPages: Math.ceil(filteredPosts.length / postsPerPage)
    };
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return {
      items: [],
      categories: [],
      tags: [],
      totalPages: 0
    };
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(process.cwd(), 'content/blog', `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { data, content } = matter(fileContents);
    const processedContent = await remark()
      .use(html)
      .process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      content: contentHtml,
      ...data,
    } as BlogPost;
  } catch (error) {
    console.error(`Failed to get blog post: ${slug}`, error);
    return null;
  }
}