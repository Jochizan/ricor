import ProductCard from '@components/ProductCard';
import ImageCard from 'public/restaurantCard.png';
import Meta from '@components/Meta';
import type { NextPage } from 'next';
import { products as oldProducts } from '@hooks/useShoppingCart';
import pachamanca1 from 'public/saucer/pachamanca1.png';
import pachamanca2 from 'public/saucer/pachamanca2.png';
import pachamanca3 from 'public/saucer/pachamanca3.png';
import pachamanca4 from 'public/saucer/pachamanca4.png';
import { useState } from 'react';

const ProductsPage: NextPage = () => {
  const [disabled, setDisabled] = useState(false);
  const images = [pachamanca1, pachamanca2, pachamanca3, pachamanca4];

  const products = oldProducts.map((product, idx) => {
    product.image = images[idx];
    return product;
  });

  return (
    <main
      className='flex-grow flex justify-center p-4 bg-fixed'
      style={{
        backgroundImage: 'url(' + ImageCard.src + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Meta title='Ricor' description='Platillos' image={ImageCard} />
      <div className='mt-16 h-min w-screen-lg bg-amber-300 dark:bg-amber-900 px-4 rounded-lg'>
        <h2 className='text-3xl p-4 text-stone-700 dark:text-stone-100 font-medium'>
          Platillos Principales
        </h2>
        <section className='w-100 flex max-w-screen-md justify-center pb-8'>
          <div className='grid gap-8 w-100 md:grid-cols-2 row-auto'>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                disabled={disabled}
                onClickAdd={() => setDisabled(true)}
                onAddEnded={() => setDisabled(false)}
                {...product}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductsPage;
