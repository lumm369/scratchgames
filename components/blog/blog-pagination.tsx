import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  basePath,
}: BlogPaginationProps) {
  return (
    <div className="flex justify-center gap-2">
      <Button
        variant="outline"
        disabled={currentPage <= 1}
        asChild
      >
        <Link href={`${basePath}?page=${currentPage - 1}`}>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Link>
      </Button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          asChild
        >
          <Link href={`${basePath}?page=${page}`}>
            {page}
          </Link>
        </Button>
      ))}

      <Button
        variant="outline"
        disabled={currentPage >= totalPages}
        asChild
      >
        <Link href={`${basePath}?page=${currentPage + 1}`}>
          Next
          <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}