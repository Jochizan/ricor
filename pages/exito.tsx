import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useShoppingCart } from '@hooks/useShoppingCart';
import { fetcher, shootFireworks } from '@libs/utils';
import { CheckIcon } from '@heroicons/react/outline';
import type { NextPage } from 'next';
import ImageCart from 'public/misc.png';
import Meta from '@components/Meta';

const SuccessPage: NextPage = () => {
  const {
    query: { session_id }
  } = useRouter();

  const { clearCart } = useShoppingCart();

  const { data, error } = useSWR(
    () => `/api/checkout_sessions/${session_id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      shootFireworks();
      clearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <main
      className='flex-grow flex justify-center p-4 bg-fixed'
      style={{
        backgroundImage: 'url(' + ImageCart.src + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='mt-16 h-min w-screen-lg bg-amber-300 dark:bg-amber-900 px-4 rounded-lg'>
        <div className='container xl:max-w-screen-xl mx-auto py-12 px-6 text-center'>
          {error ? (
            <div className='py-2 px-4 rounded-md bg-red-600 max-w-md mx-auto'>
              <Meta
                title='Ricor'
                description='Pago fallido 😒😒'
                image={ImageCart}
              />
              <p className='text-xl font-medium text-stone-700 dark:text-stone-100'>
                Lo siento, algo salio mal!
              </p>
              <p className='text-4xl'>😔😔😤😤</p>
            </div>
          ) : !data ? (
            <div className='p-2 rounded-md bg-yellow-600 max-w-md mx-auto'>
              <p className='text-xl animate-pulse font-medium  text-stone-700 dark:text-stone-100'>
                Cargando...
              </p>
            </div>
          ) : (
            <div className='py-4 px-8 rounded-md bg-green-600 max-w-lg mx-auto'>
              <h2 className='text-4xl font-semibold flex flex-col items-center space-x-1'>
                <Meta
                  title='Ricor'
                  description='Pago exitoso 😊😊'
                  image={ImageCart}
                />
                <CheckIcon className='w-12 h-12 flex-shrink-0 text-white' />
                <span className='font-medium'>Gracias por su orden!</span>
              </h2>
              <p className='text-4xl'>👌👌😘😘</p>
              <p className='text-xl mt-3 text-stone-700 dark:text-stone-100'>
                Le llegara una confirmación a su correo
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SuccessPage;
