
import { useReviewsByProduct } from '@/core/query/queries/reviews.queries';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/Card';
import { Separator } from '@/shared/components/ui/Separator';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';
import { Badge } from '@/shared/components/ui/Badge';
import { Pagination } from '@/shared/components/ui/Pagination';
import { Review } from '@/types/review.type';
import { format } from 'date-fns';

function ReviewItem({ review }: { review: Review }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-muted'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm font-medium">{review.userName || 'Anonymous'}</span>
            {review.isVerified && (
              <Badge variant="secondary" className="text-xs">
                Verified Purchase
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {review.createdAt ? format(new Date(review.createdAt), 'MMM dd, yyyy') : ''}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{review.comment}</p>
        {review.tags && review.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {review.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface ReviewListProps {
  productId: string;
}

export function ReviewList({ productId }: ReviewListProps) {
  const [page, setPage] = React.useState(1);
  const { data, isLoading, error } = useReviewsByProduct(productId, { page, limit: 10 });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data?.success || !data.data) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Failed to load reviews</p>
      </div>
    );
  }

  const reviews = data.data;
  const pagination = data.meta;

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Showing {reviews.length} of {pagination?.total || 0} reviews
      </div>
      <Separator />
      <div className="space-y-4">
        {reviews.map((review: Review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
}

