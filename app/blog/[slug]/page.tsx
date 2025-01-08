import Image from 'next/image';
import { getBlogPost } from '@/actions/blog';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/bread-crumb';
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

type Props = Promise<{
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}>

export async function generateMetadata(props: { params: Props }) {
  const { params } = await props.params;
  const post = await getBlogPost(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${siteConfig.title} Blog - ${post.title}`,
    description: post.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage(props: { params: Props }) {
  const { params } = await props.params;
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  return (
    <article className="container mx-auto">
      <Breadcrumb 
        items={[
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` }
        ]} 
      />
      {/* 文章头部 */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center space-x-4 text-muted-foreground">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span>{post.author.name}</span>
          <time>{post.publishedAt}</time>
          <span>{post.readingTime}</span>
        </div>
      </header>

      {/* 文章封面图 */}
      <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* 文章内容 */}
      <div 
        className="prose prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* 文章标签 */}
      <div className="mt-8 pt-8 border-t">
        <div className="flex gap-2">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}