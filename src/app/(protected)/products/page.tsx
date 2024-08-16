import { signOut } from '@/auth';

const ProductsPage = async () => {
  return (
    <div>
      <span>Products Page!</span>
      <form
        action={async () => {
          'use server';

          await signOut();
        }}>
        <button type='submit'>Sign out</button>
      </form>
    </div>
  );
};

export default ProductsPage;
