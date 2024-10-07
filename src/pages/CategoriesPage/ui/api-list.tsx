'use client';

// FIXME More responsibility and universal

import { useParams } from 'next/navigation';

import { ApiAlert } from '@/features/ApiAlert';
import { useOrigin } from '@/shared/model';

type ApiListProps = {
  entityName: string;
  entityIdName: string;
};

export const ApiList = ({ entityName, entityIdName }: ApiListProps) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params?.storeId}`;

  return (
    <>
      <ApiAlert
        title='GET'
        description={`${baseUrl}/${entityName}`}
        variant='public'
      />
      <ApiAlert
        title='GET'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant='public'
      />
      <ApiAlert
        title='POST'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant='admin'
      />

      <ApiAlert
        title='PATCH'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant='public'
      />
      <ApiAlert
        title='DELETE'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant='admin'
      />
    </>
  );
};
