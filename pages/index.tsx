import Meta from 'components/Meta';
import type { NextPage } from 'next';
import Link from 'next/link';
import ImageHome from 'public/restaurantHome.png';

const HomePage: NextPage = () => {
  return (
    <main
      className='flex-grow flex justify-center bg-fixed'
      style={{
        backgroundImage: 'url(' + ImageHome.src + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Meta title='Ricor' description='Home page Ricor' image={ImageHome} />
      <div className='h-100 flex flex-col justify-center rounded-2xl'>
        <div className='flex flex-col justify-center h-min p-4  xl:max-w-screen-xl mx-auto text-center backdrop-blur-sm'>
          <div className='container flex flex-col items-center'>
            <h2 className='font-semibold text-9xl text-stone-100 pb-4'>Ricor</h2>
            <p className='text-3xl font-medium text-center text-stone-100'>
              Restaurante Ricor para comer y beber en la incontrastable
              Huancayo, con una carta de comida y bebida de primera calidad.
            </p>
            <div className='mt-4'>
              <Link href='/productos' passHref>
                <button className='bg-yellow-600 text-stone-100 font-semibold py-2 px-4 rounded-md hover:bg-yellow-700 focus:outline-none transition-all focus:shadow-outline shadow-lg shadow-yellow-500/50'>
                  Ordena ahora
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
