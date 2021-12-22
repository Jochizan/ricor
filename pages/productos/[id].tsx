import { MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline';
import { useShoppingCart } from '@hooks/useShoppingCart';
import { products } from '../products';
import { useState, useEffect, useRef, FC } from 'react';
import ImageCard from 'public/restaurantCard.png';
import { formatCurrency } from '@libs/utils';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Meta from '@components/Meta';

const Product: FC<any> = (props) => {
  const router = useRouter();
  const { cartCount, addItem } = useShoppingCart();
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);

  const toastId = useRef<any>();
  const firstRun = useRef(true);

  const handleOnAddToCart = () => {
    setAdding(true);
    toastId.current = toast.loading(
      `Añadiendo ${qty} platillo${qty > 1 ? 's' : ''}...`
    );
    addItem(props.id, qty);
  };

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    setAdding(false);
    toast.success(`${qty} ${props.name} añadidos`, {
      id: toastId.current
    });
    setQty(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartCount]);

  return (
    <main
      className='flex-grow flex justify-center items-center p-4 bg-fixed'
      style={{
        backgroundImage: 'url(' + ImageCard.src + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className='mt-16 h-min w-screen-lg bg-amber-300 dark:bg-amber-900 px-4 rounded-lg'>
        {router.isFallback ? (
          <>
            <Meta title='Platillos' description='cargando...' />
            <p className='text-center text-lg py-12'>Cargando...</p>
          </>
        ) : (
          <div className='container lg:max-w-screen-lg mx-auto py-12 px-6'>
            <Meta
              title='Platillos'
              description={`${props.name}`}
              image={ImageCard}
            />
            <div className='flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-12 '>
              {/* Product's image */}
              <div className='relative w-72 h-72 sm:w-96 sm:h-96'>
                <Image
                  src={props.image}
                  alt={props.name}
                  layout='fill'
                  objectFit='contain'
                />
              </div>

              {/* Product's details */}
              <div className='flex-1 max-w-md border border-opacity-50 rounded-md shadow-lg p-6 border-slate-700 dark:border-slate-200'>
                <h2 className='text-3xl font-semibold'>{props.name}</h2>
                <p>
                  <span className='text-stone-700 dark:text-stone-100 font-medium'>
                    Disponibilidad:
                  </span>{' '}
                  <span className='font-medium'>En stock</span>
                </p>
                <p>
                  <span className='text-stone-700 dark:text-stone-100 font-medium'>
                    Descripción:
                  </span>{' '}
                  <span className='font-normal'>{props.description}</span>
                </p>

                {/* Price */}
                <div className='lg:flex w-100 justify-around items-center'>
                  <div className='mt-8 border-t pt-4 border-slate-700 dark:border-slate-200'>
                    <p className='text-stone-700 dark:text-stone-100 font-medium'>
                      Precio:
                    </p>
                    <p className='text-xl font-semibold'>
                      {formatCurrency(props.price * qty)}
                    </p>
                  </div>

                  <div className='mt-8 border-t pt-4 border-slate-700 dark:border-slate-200'>
                    {/* Quantity */}
                    <p className='text-stone-700 dark:text-stone-100 font-medium'>
                      Cantidad:
                    </p>
                    <div className='mt-1 flex items-center space-x-3'>
                      <button
                        onClick={() => setQty((prev) => prev - 1)}
                        disabled={qty <= 1}
                        className='disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current hover:bg-red-500 hover:text-red-200 rounded-md p-1
                      '
                      >
                        <MinusSmIcon className='w-6 h-6 flex-shrink-0' />
                      </button>
                      <p className='font-semibold text-xl'>{qty}</p>
                      <button
                        onClick={() => setQty((prev) => prev + 1)}
                        className='
                      hover:bg-green-500 hover:text-green-200 rounded-md p-1 text-stone-700 dark:text-stone-100
                      '
                      >
                        <PlusSmIcon className='w-6 h-6 flex-shrink-0 ' />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Add to cart button */}
                <div className='flex justify-center'>
                  <button
                    type='button'
                    onClick={handleOnAddToCart}
                    disabled={adding}
                    className='border font-medium rounded py-2 px-6 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 focus:ring-4 focus:ring-opacity-50 focus:ring-yellow-500 text-stone-700 dark:text-stone-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-500 max-w-max mt-4'
                  >
                    Add to cart ({qty})
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export async function getStaticPaths() {
  return {
    // Existing posts are rendered to HTML at build time
    paths: Object.keys(products)?.map((id) => ({
      params: { id }
    })),
    // Enable statically generating additional pages
    fallback: true
  };
}

export async function getStaticProps({ params }: any) {
  try {
    const props =
      products?.find((product: any) => product.id === params.id) ?? {};

    return {
      props,
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every second
      revalidate: 1 // In seconds
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default Product;
