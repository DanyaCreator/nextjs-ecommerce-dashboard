'use client';

import { EntityHeader } from '@/shared/ui';

type ReviewsHeaderProps = {
  reviewsCount?: number;
};

export const ReviewsHeader = ({ reviewsCount }: ReviewsHeaderProps) => {
  return <EntityHeader entityName='reviews' entityCount={reviewsCount} />;
};
