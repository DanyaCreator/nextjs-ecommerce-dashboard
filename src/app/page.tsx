'use client';

import { logout } from '@/shared/api';

export default function Home() {
  return (
    <div>
      <div>Home page</div>
      <button onClick={async () => await logout()}>log out</button>
    </div>
  );
}
