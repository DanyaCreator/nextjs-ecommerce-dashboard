'use client';

import { useParams } from 'next/navigation';

import { dmSans } from '@/shared/assets/fonts';
import { useOrigin } from '@/shared/model';
import { ApiAlert } from './api-alert';

export type ApiData = {
  title: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  endpoint: string;
  variant: 'public' | 'admin';
};

type ApiListProps = {
  data: ApiData[];
  entityName: string;
};

export const ApiList = ({ data, entityName }: ApiListProps) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params?.storeId}`;

  return (
    <>
      <div>
        <h1 className={`${dmSans.className}`}>API</h1>
        <span className={`${dmSans.className} text-dark-gray`}>
          API calls for {entityName}
        </span>
      </div>
      <div className='flex flex-col'>
        {data.map((a, i) => (
          <ApiAlert
            key={i}
            title={a.title}
            description={baseUrl + '/' + a.endpoint}
            variant={a.variant}
          />
        ))}
      </div>
    </>
  );
};
