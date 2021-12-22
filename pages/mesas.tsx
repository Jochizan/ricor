import Meta from '@components/Meta';
import {
  DotsVerticalIcon,
  InformationCircleIcon
} from '@heroicons/react/solid';
import type { NextPage } from 'next';
import ImageMesas from 'public/restaurantMesas.png';

const TablePage: NextPage = () => {
  return (
    <main
      className='flex-grow flex justify-center items-center p-4 bg-fixed'
      style={{
        backgroundImage: 'url(' + ImageMesas.src + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Meta title='Ricor' description='Mesas' image={ImageMesas} />
      <div className='mt-12 h-min w-screen-lg flex flex-col bg-amber-300 dark:bg-amber-900 px-2 md:px-4 rounded-lg'>
        <h2 className='text-3xl p-2 md:p-4 text-stone-700 dark:text-stone-100 font-medium'>
          Mesas
        </h2>
        <section className='flex flex-col max-w-screen-md justify-center pb-4 md:pb-8 text-stone-700 dark:text-stone-100 '>
          <div className='bg-stone-200 w-72 md:w-96 h-12 dark:bg-stone-600 rounded-lg flex justify-around items-center my-2'>
            <p className='text-stone-700 dark:text-stone-100 font-medium'>
              001
            </p>
            <p className='bg-red-600 w-32 text-white text-center font-semibold w-100 h-100 rounded-md'>
              Ocupado
            </p>
            <InformationCircleIcon className='w-6 h-6' />
            <DotsVerticalIcon className='w-6 h-6' />
          </div>

          <div className='bg-stone-200 w-72 md:w-96 h-12 dark:bg-stone-600 rounded-lg flex justify-around items-center my-2'>
            <p className='text-stone-700 dark:text-stone-100 font-medium'>
              002
            </p>
            <p className='bg-green-600 w-32 text-white text-center font-semibold w-100 h-100 rounded-md'>
              Desocupado
            </p>
            <InformationCircleIcon className='w-6 h-6' />
            <DotsVerticalIcon className='w-6 h-6' />
          </div>
          <div className='bg-stone-200 w-72 md:w-96 h-12 dark:bg-stone-600 rounded-lg flex justify-around items-center my-2'>
            <p className='text-stone-700 dark:text-stone-100 font-medium'>
              003
            </p>
            <p className='bg-green-600 w-32 text-white text-center font-semibold w-100 h-100 rounded-md'>
              Desocupado
            </p>
            <InformationCircleIcon className='w-6 h-6' />
            <DotsVerticalIcon className='w-6 h-6' />
          </div>

          <div className='bg-stone-200 w-72 md:w-96 h-12 dark:bg-stone-600 rounded-lg flex justify-around items-center my-2'>
            <p className='text-stone-700 dark:text-stone-100 font-medium'>
              004
            </p>
            <p className='bg-green-600 w-32 text-white text-center font-semibold w-100 h-100 rounded-md'>
              Desocupado
            </p>
            <InformationCircleIcon className='w-6 h-6' />
            <DotsVerticalIcon className='w-6 h-6' />
          </div>

          <div className='bg-stone-200 w-72 md:w-96 h-12 dark:bg-stone-600 rounded-lg flex justify-around items-center my-2'>
            <p className='text-stone-700 dark:text-stone-100 font-medium'>
              005
            </p>
            <p className='bg-red-600 w-32 text-white text-center font-semibold w-100 h-100 rounded-md'>
              Ocupado
            </p>
            <InformationCircleIcon className='w-6 h-6' />
            <DotsVerticalIcon className='w-6 h-6' />
          </div>

          <div className='bg-stone-200 w-72 md:w-96 h-12 dark:bg-stone-600 rounded-lg flex justify-around items-center my-2'>
            <p className='text-stone-700 dark:text-stone-100 font-medium'>
              006
            </p>
            <p className='bg-red-600 w-32 text-white text-center font-semibold w-100 h-100 rounded-md'>
              Ocupado
            </p>
            <InformationCircleIcon className='w-6 h-6' />
            <DotsVerticalIcon className='w-6 h-6' />
          </div>
        </section>
      </div>
    </main>
  );
};

export default TablePage;
