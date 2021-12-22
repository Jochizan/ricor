import { useState, useEffect, useRef, FC, SyntheticEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useShoppingCart } from '@hooks/useShoppingCart';
import { formatCurrency } from '@libs/utils';
import Rating from '@components/Rating';

const ProductCard: FC<any> = (props) => {
  const { cartCount, addItem } = useShoppingCart();
  const [adding, setAdding] = useState(false);

  const toastId = useRef<any>();
  const firstRun = useRef(true);

  const handleOnAddToCart = (e: SyntheticEvent) => {
    e.preventDefault();

    setAdding(true);
    toastId.current = toast.loading('Se esta añadio un elemento...');

    if (typeof props.onClickAdd === 'function') {
      props.onClickAdd();
    }

    addItem(props.id);
  };

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    if (adding) {
      setAdding(false);
      toast.success(`${props.name} añadido`, {
        id: toastId.current
      });
    }

    if (typeof props.onAddEnded === 'function') {
      props.onAddEnded();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartCount]);

  return (
    <Link href={`/productos/${props.id}`} passHref>
      <a className='border p-6 group bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 dark:from-yellow-600 dark:via-amber-600 dark:to-orange-600 rounded-lg shadow-md shadow-yellow-500/50 cursor-pointer font-medium border-slate-700 dark:border-slate-200'>
        <div className='relative w-full h-52 group-hover:transform group-hover:scale-110 group-hover:ease-in-out group-hover:duration-500'>
          <Image
            src={props.image}
            alt={props.name}
            layout='fill'
            objectFit='contain'
          />
        </div>

        <div className='mt-1 sm:mt-2'>
          <p className='font-semibold text-lg capitalize text-stone-700 dark:text-stone-100'>
            {props.name}
          </p>
          <Rating rate={props?.rating?.rate} count={props?.rating?.count} />
        </div>

        <div className='mt-4 flex items-center justify-between space-x-2'>
          <div>
            <p className='text-stone-700 dark:text-stone-100'>Price</p>
            <p className='text-lg text-stone-700 dark:text-stone-100 font-semibold'>
              {formatCurrency(props.price, props.currency)}
            </p>
          </div>

          <button
            type='button'
            onClick={handleOnAddToCart}
            disabled={adding || props.disabled}
            className={`border rounded-lg font-medium py-1 px-4  hover:bg-yellow-500 hover:border-yellow-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-stone-700 dark:border-stone-100 dark:hover:border-yellow-500 text-stone-700 dark:text-stone-100 shadow-lg shadow-yellow-500/50 ${
              adding
                ? 'disabled:bg-ambar-500 disabled:border-ambar-500 disabled:text-white'
                : 'disabled:hover:bg-transparent disabled:hover:text-current disabled:hover:border-stone-200'
            }`}
          >
            {adding ? 'Añadiendo...' : 'Añadir al carrito'}
          </button>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
