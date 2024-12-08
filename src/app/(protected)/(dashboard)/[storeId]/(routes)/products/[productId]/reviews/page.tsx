import React from 'react';

// eslint-disable-next-line import/no-internal-modules
import { ReviewsPage } from '@/screens/ReviewsPage';

type ReviewsProps = {
  params: { storeId: string; productId: string };
};

const Reviews = ({ params }: ReviewsProps) => {
  return <ReviewsPage storeId={params.storeId} />;
};

export default Reviews;
