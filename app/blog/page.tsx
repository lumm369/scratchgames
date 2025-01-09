import { getBlogPosts } from '@/actions/blog';
import BlogCard from '@/components/blog/blog-card';
import BlogFilter from '@/components/blog/blog-filter';
import BlogPagination from '@/components/blog/blog-pagination';
import type { BlogPost, BlogResponse } from '@/types/blog';
import Breadcrumb from '@/components/bread-crumb';
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

// 定义 generateMetadata 函数
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteConfig.title + ' - Blog',
    description: 'Discover the latest tutorials and news about Scratch game development',
    alternates: {
      canonical: `${siteConfig.url}/blog`,
    },
  };
}


type BlogPageProps = Promise<{
  page?: string;
  category?: string;
  tag?: string;
}>

export default async function BlogPage(props: { searchParams: BlogPageProps }) {
  const searchParams = await props.searchParams;
  const { items, categories, tags, totalPages }: BlogResponse = await getBlogPosts({
    page: Number(searchParams.page) || 1,
    category: searchParams.category,
    tag: searchParams.tag,
  });

  return (
    <div className="space-y-8">
      <Breadcrumb 
        items={[
          { label: "Blog", href: "/blog" },
        ]} 
      />
      {/* Blog Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Blog
        </h1>
        <p className="text-lg text-muted-foreground">
          Latest tutorials and news about Scratch games player & development
        </p>
      </div>

      {/* Blog Filter */}
      <BlogFilter 
        categories={categories}
        tags={tags}
        currentCategory={searchParams.category}
        currentTag={searchParams.tag}
      />

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <BlogPagination 
        currentPage={Number(searchParams.page) || 1}
        totalPages={totalPages}
        basePath="/blog"
      />
    </div>
  );
}