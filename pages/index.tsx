import Meta from 'components/Meta';
import type { NextPage } from 'next';
import ImageHome from 'public/restaurantHome.png';

const HomePage: NextPage = () => {
  return (
    <main
      className='flex-grow flex justify-center p-4 bg-fixed'
      style={{
        backgroundImage: 'url(' + ImageHome.src + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Meta title='Ricor' description='Home page restaurante Ricor' />
    </main>
  );
};

export default HomePage;
