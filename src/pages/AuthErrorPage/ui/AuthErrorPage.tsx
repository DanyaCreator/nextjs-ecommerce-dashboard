import { loginBackgroundImage } from '@/shared/assets/img';
import { CardWrapper } from '@/shared/ui/modals';

export const AuthErrorPage = () => {
  return (
    <main
      style={{
        backgroundImage: `url("${loginBackgroundImage.src}")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      className='w-screen h-screen flex justify-center items-center'>
      <CardWrapper>
        <div></div>
      </CardWrapper>
    </main>
  );
};
