import { auth, signOut } from '@/auth';

const ProductsPage = async () => {
  const session = await auth();

  return (
    <div>
      <span>{JSON.stringify(session)}</span>
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
