import { DataTable } from '@/shared/ui';
import { ReviewColumn, columns } from './columns';

type ReviewsTableProps = {
  data: ReviewColumn[];
};

export const ReviewsTable = ({ data }: ReviewsTableProps) => {
  return <DataTable searchKey='name' columns={columns} data={data} />;
};
