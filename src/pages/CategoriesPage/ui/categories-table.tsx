import { DataTable } from '@/shared/ui';
import { CategoryColumn, columns } from './columns';

type CategoriesTableProps = {
  data: CategoryColumn[];
};

export const CategoriesTable = ({ data }: CategoriesTableProps) => {
  return <DataTable searchKey='label' columns={columns} data={data} />;
};
