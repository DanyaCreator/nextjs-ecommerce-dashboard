import { format } from 'date-fns';

import { db } from '@/lib';
import { ApiData, ApiList } from '@/widgets/ApiList';
import { ReviewColumn, ReviewsTable } from '@/features/Review';
import { ReviewsHeader } from '@/entities/Review';

type ReviewsPageProps = {
  storeId: string;
  productId: string;
};

const apiCalls: ApiData[] = [
  {
    title: 'GET',
    endpoint: 'products/{productId}/reviews',
    variant: 'public',
  },
  {
    title: 'POST',
    endpoint: 'products/{productId}/reviews',
    variant: 'public',
  },
  {
    title: 'DELETE',
    endpoint: 'products/{productId}/reviews/{reviewId}',
    variant: 'admin',
  },
];

export const ReviewsPage = async ({ storeId, productId }: ReviewsPageProps) => {
  const reviews = await db.productReview.findMany({
    where: { product: { storeId, id: productId } },
    include: {
      product: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedReviewItems: ReviewColumn[] = reviews.map((i) => ({
    id: i.id,
    productName: i.product.name,
    productId: i.productId,
    text: i.text,
    name: i.name,
    rating: Number(i.rating),
    createdAt: format(i.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <main className='container h-[80%] py-10 bg-white rounded-b-xl overflow-hidden'>
      <div className='h-full overflow-auto px-3'>
        <section className='flex-1'>
          <ReviewsHeader reviewsCount={reviews.length} />
        </section>
        <section className='mt-6'>
          <ReviewsTable data={formattedReviewItems} />
        </section>
        <section>
          <ApiList data={apiCalls} entityName='reviews' />
        </section>
      </div>
    </main>
  );
};
