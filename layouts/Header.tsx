import Link from 'next/link';
import Image from 'next/image';
import useChangeTheme from 'hooks/useChangeTheme';
import {
  UserIcon,
  CalendarIcon,
  ViewGridIcon,
  ShoppingCartIcon,
  CollectionIcon
} from '@heroicons/react/solid';
import logo from 'public/logo.png';
import { useShoppingCart } from '@hooks/useShoppingCart';

const Header = () => {
  const { cartCount } = useShoppingCart();
  const renderThemeChanger = useChangeTheme();

  return (
    <header className='min-w-full bg-yellow-400 dark:bg-yellow-600 flex justify-center p-2 fixed z-50'>
      <nav className='flex justify-around max-w-screen-lg w-full'>
        <Link href='/' passHref>
          <h1 className='font-bold cursor-pointer flex'>
            <p className='font-sans pr-3 text-5xl text-stone-700 dark:text-stone-100'>
              Ricor
            </p>
            <Image
              src={logo}
              alt='logo del restaurante'
              className='hover:animate-spin'
              width={48}
              height={36}
            />
          </h1>
        </Link>
        <div className='hidden sm:flex w-100 justify-around items-center'>
          <Link href='/productos'>
            <a className='text-stone-700 dark:text-stone-100 w-100 pl-3 flex flex-col justify-center items-center'>
              <CollectionIcon
                role='button'
                className='w-8 h-8 cursor-pointer'
              />
              <p className='text-stone-700 dark:text-stone-100 font-semibold'>
                Platillos
              </p>
            </a>
          </Link>
          <Link href='/mesas'>
            <a className='text-stone-700 dark:text-stone-100 w-100 pl-3 flex flex-col justify-center items-center'>
              <ViewGridIcon role='button' className='w-8 h-8 cursor-pointer' />
              <p className='text-stone-700 dark:text-stone-100 font-semibold'>
                Mesas
              </p>
            </a>
          </Link>
          <Link href='/reservas'>
            <a className='text-stone-700 dark:text-stone-100 w-100 pl-3 flex flex-col justify-center items-center'>
              <CalendarIcon role='button' className='w-8 h-8 cursor-pointer' />
              <p className='text-stone-700 dark:text-stone-100 font-semibold'>
                Reservas
              </p>
            </a>
          </Link>
          <Link href='/carro'>
            <a className='text-stone-700 dark:text-stone-100 w-100 pl-3 flex flex-col justify-center items-center'>
              <p className='absolute top-0 ml-6 left font-medium rounded-full bg-red-600 w-5 h-5 flex justify-center items-center text-stone-100'>
                {cartCount}
              </p>
              <ShoppingCartIcon
                role='button'
                className='w-8 h-8 cursor-pointer'
              />
              <p className='text-stone-700 dark:text-stone-100 font-semibold'>
                Carrito
              </p>
            </a>
          </Link>
        </div>
        <div className='flex w-100 justify-around items-center'>
          {renderThemeChanger()}
          <Link href='/auth/signin'>
            <a className='pl-4 text-stone-700 dark:text-stone-100'>
              <UserIcon role='button' className='w-8 h-8 cursor-pointer' />
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
