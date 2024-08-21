import { NewPasswordForm } from '@/widgets/NewPasswordForm';
import { loginBackgroundImage } from '@/shared/assets/img';

export const NewPasswordPage = () => {
  return (
    <main
      style={{
        backgroundImage: `url("${loginBackgroundImage.src}")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      className='w-screen h-screen flex'>
      <NewPasswordForm />
    </main>
  );
};
