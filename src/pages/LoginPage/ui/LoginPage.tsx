import { LoginForm } from '@/widgets/LoginForm';
import { loginBackgroundImage } from '@/shared/assets/img';

export const LoginPage = () => {
  return (
    <main
      style={{
        backgroundImage: `url("${loginBackgroundImage.src}")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      className='w-screen h-screen flex'>
      <LoginForm />
    </main>
  );
};
