'use client';

import { ApiAlert } from '@/widgets/ApiList';
import { dmSans } from '@/shared/assets/fonts';
import { useOrigin } from '@/shared/model';

type ApiListProps = {
  storeId: string;
};

export const ApiList = ({ storeId }: ApiListProps) => {
  const origin = useOrigin();

  return (
    <section>
      <div>
        <h1 className={`${dmSans.className}`}>API</h1>
        <span className={`${dmSans.className} text-dark-gray`}>
          API calls for stores
        </span>
      </div>
      <ApiAlert
        title='NEXT_PUBLIC_API_URL'
        description={`${origin}/api/${storeId}`}
        variant='public'
      />
    </section>
  );
};
