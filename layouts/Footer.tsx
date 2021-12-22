import { HeartIcon } from '@heroicons/react/solid';

const Footer = () => {
  return (
    <footer className='w-100 bg-yellow-400 dark:bg-yellow-600 flex justify-center p-2'>
      <p>
        <a
          href='https://jochizan.me'
          target='_blank'
          rel='noopener noreferrer'
          className='text-stone-700 dark:text-stone-100 hover:text-current font-medium'
        >
          Made with{' '}
          <HeartIcon className='inline-block w-5 h-5 -mt-1 text-red-600 animate-pulse' />{' '}
          by Jochizan
        </a>
      </p>
    </footer>
  );
};

export default Footer;
