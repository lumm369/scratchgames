import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BlogFilterProps {
  categories: string[];
  tags: string[];
  currentCategory?: string;
  currentTag?: string;
}

export default function BlogFilter({
  categories,
  tags,
  currentCategory,
  currentTag,
}: BlogFilterProps) {
  return (
    <div className="space-y-4">
      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <Link 
          href="/blog"
          className={cn(
            "rounded-lg px-3 py-1 text-sm transition-colors",
            !currentCategory ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
          )}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/blog?category=${category}`}
            className={cn(
              "rounded-lg px-3 py-1 text-sm transition-colors",
              currentCategory === category 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {category}
          </Link>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog?tag=${tag}`}
          >
            <Badge 
              variant={currentTag === tag ? "default" : "secondary"}
              className="cursor-pointer"
            >
              {tag}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}