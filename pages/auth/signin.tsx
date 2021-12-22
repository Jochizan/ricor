import { HomeIcon } from '@heroicons/react/solid';
import useChangeTheme from 'hooks/useChangeTheme';
import type { NextPage } from 'next';
import Link from 'next/link';

const SignIn: NextPage = () => {
  const renderThemeChanger = useChangeTheme();

  return (
    <main className='min-h-screen h-100 w-100 flex justify-center p-2 bg-fixed'>
      <div className='fixed flex justify-between items-center text-stone-700 dark:text-stone-100'>
        {renderThemeChanger()}
        <Link href='/' passHref>
          <a>
            <HomeIcon className='w-8 h-8 cursor-pointer' />
          </a>
        </Link>
      </div>
      <div className='pt-12 w-screen-lg flex flex-col'>
        <section className='w-100 p-4'>
          <h2 className='text-3xl text-center'>Iniciar Sesión</h2>
        </section>
        <section className='w-100 p-4 flex justify-center items-center'>
          <div className='w-full max-w-lg'>
            <div className='bg-white dark:bg-stone-800 rounded shadow-lg px-8 pt-6 pb-8 mb-4'>
              <div className='mb-4'>
                <label className='block text-stone-700 dark:text-stone-200 text-sm font-bold mb-2'>
                  Correo Electrónico
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline'
                  type='email'
                  placeholder='Email'
                />
              </div>
              <div className='mb-4'>
                <label className='block text-stone-700 dark:text-stone-200 text-sm font-bold mb-2'>
                  Contraseña
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-stone-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  type='password'
                  placeholder='******************'
                />
              </div>
              <div className='flex items-center justify-center'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='button'
                >
                  Sign In
                </button>
              </div>
              <p className='text-sm pt-4 text-blue-500 cursor-pointer whitespace-nowrap'>
                No tienes una cuenta
                <Link href='/auth/register' passHref>
                  <span className='font-bold hover:text-blue-800'>
                    {' '}
                    registrate
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignIn;
