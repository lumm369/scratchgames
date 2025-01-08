export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  category: string;
  tags: string[];
  coverImage: string;
  readingTime: string;
  viewCount: number;
  date: string;
}

export interface BlogResponse {
  items: BlogPost[];
  categories: string[];
  tags: string[];
  totalPages: number;
}