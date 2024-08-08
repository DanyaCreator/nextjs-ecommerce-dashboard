import { dmSans } from '@/shared/assets/fonts';
import { googleIcon, loginBackgroundImage } from '@/shared/assets/img';
import { TextInput } from '@/shared/ui/inputs';
import clsx from 'clsx';
import Image from 'next/image';

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
      <section className='flex flex-col gap-4 items-center w-fit p-8 m-auto bg-white rounded-xl shadow-xl'>
        <h1 className={`${dmSans.className} text-3xl text-black font-bold`}>
          Sign in
        </h1>
        <TextInput placeholder={'Email'} type={'text'} />
        <TextInput placeholder={'Password'} type={'password'} />
        <button
          className={`${dmSans.className} text-h5 text-black hover:text-dark-gray transition-colors`}>
          Have you forgotten your password?
        </button>
        <div className='flex flex-col gap-6 w-full'>
          <button
            className={clsx(
              'w-full h-8 mt-16 flex justify-center items-center',
              'text-white text-[12px] font-medium tracking-[2.5%]',
              'bg-black rounded border-solid border border-black',
              'hover:bg-white hover:text-black transition-colors'
            )}>
            SIGN IN
          </button>
          <div className='relative w-full h-[1px] bg-black'>
            <span
              className={clsx(
                'absolute top-1/2 left-1/2 px-2 py-1',
                `${dmSans.className} text-h5 text-black bg-white`,
                'translate-x-[-50%] translate-y-[-50%]'
              )}>
              or
            </span>
          </div>
          <div className='flex gap-2 items-center w-full justify-center'>
            <Image src={googleIcon} alt={'google-icon'} width={18} height={18} />
            <button
              className={`${dmSans.className} text-h5 text-black hover:text-dark-gray transition-colors`}>
              Sign in with Google
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
