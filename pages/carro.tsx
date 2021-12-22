import type { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useShoppingCart } from '@hooks/useShoppingCart.js';
import { formatCurrency } from '@libs/utils';
import getStripe from '@libs/get_stripe';
import {
  XCircleIcon,
  MinusSmIcon,
  PlusSmIcon,
  XIcon
} from '@heroicons/react/outline';
import ImageCart from 'public/misc.png';
import Meta from '@components/Meta';

const CartPage: NextPage = () => {
  const { cart, totalPrice, cartCount, addItem, removeItem, clearCart } =
    useShoppingCart();
  const [redirecting, setRedirecting] = useState(false);

  const redirectToCheckout = async () => {
    // Create Stripe checkout
    const {
      data: { id }
    } = await axios.post('/api/checkout_sessions', {
      items: Object.entries(cart).map(([_, { id, quantity }]: any) => ({
        price: id,
        quantity
      }))
    });

    // Redirect to checkout
    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  console.log(cart);

  return (
    <main
      className='flex-grow flex justify-center items-center p-4 bg-fixed'
      style={{
        backgroundImage: 'url(' + ImageCart.src + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Meta title='Ricor' description='Carro de su mesa' />
      <div className='mt-16 h-min w-screen-lg bg-amber-300 dark:bg-amber-900 px-4 rounded-lg'>
        <div className='container xl:max-w-screen-xl mx-auto py-12 px-6'>
          {cartCount > 0 ? (
            <>
              <h2 className='text-4xl font-semibold'>Este es su carrito</h2>
              <p className='mt-1 text-xl'>
                {cartCount + ' plato'}
                {cartCount > 1 ? 's' : ''}{' '}
                <button
                  onClick={clearCart}
                  className='opacity-50 hover:opacity-100 font-medium text-base capitalize'
                >
                  (Limpiar Todo)
                </button>
              </p>
            </>
          ) : (
            <>
              <h2 className='text-4xl font-semibold'>Su carrito está vacío</h2>
              <p className='mt-1 text-xl'>
                Vea nuestros platillos{' '}
                <Link href='/productos'>
                  <a className='text-red-500 dark:text-yellow-500 underline text-xl'>
                    aquí!
                  </a>
                </Link>
              </p>
            </>
          )}

          {cartCount > 0 ? (
            <div className='mt-12'>
              {Object.entries(cart).map(([key, product]: any) => (
                <div
                  key={key}
                  className='flex justify-between space-x-4 hover:shadow-lg hover:border-opacity-50 border border-opacity-0 rounded-md p-4 hover:border-slate-700 hover:dark:border-slate-200'
                >
                  {/* Image + Name */}
                  <Link href={`/productos/${product.id}`}>
                    <a className='flex items-center space-x-4 group'>
                      <div className='relative w-20 h-20 group-hover:scale-110 transition-transform text-stone-700 dark:text-stone-100'>
                        <Image
                          src={product.image}
                          alt={product.name}
                          layout='fill'
                          objectFit='contain'
                        />
                      </div>
                      <p className='font-semibold text-xl group-hover:underline'>
                        {product.name}
                      </p>
                    </a>
                  </Link>

                  {/* Price + Actions */}
                  <div className='flex items-center text-stone-700 dark:text-stone-100'>
                    {/* Quantity */}
                    <div className='flex items-center space-x-3'>
                      <button
                        onClick={() => removeItem(product.id)}
                        disabled={product?.quantity <= 1}
                        className='disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current hover:bg-red-500 hover:text-red-200 rounded-md p-1'
                      >
                        <MinusSmIcon className='w-6 h-6 flex-shrink-0' />
                      </button>
                      <p className='font-semibold text-xl'>
                        {product.quantity}
                      </p>
                      <button
                        onClick={() => addItem(product.id)}
                        className='hover:bg-green-500 hover:text-green-200 rounded-md p-1 text-stone-700 dark:text-stone-100'
                      >
                        <PlusSmIcon className='w-6 h-6 flex-shrink-0 ' />
                      </button>
                    </div>

                    <p className='font-semibold text-xl ml-6'>
                      <XIcon className='w-4 h-4 text-stone-700 dark:text-stone-100 inline-block' />{' '}
                      {formatCurrency(product.price)}
                    </p>
                    {/* SubPrice */}
                    <p className='font-semibold text-xl ml-6'>
                      = {formatCurrency(product.price * product.quantity)}
                    </p>

                    {/* Remove item */}
                    <button
                      onClick={() => removeItem(product.id, product.quantity)}
                      className='ml-4 hover:text-yellow-500'
                    >
                      <XCircleIcon className='w-6 h-6 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity' />
                    </button>
                  </div>
                </div>
              ))}

              <div className='flex justify-end items-center border-t py-4 mt-8 text-stone-700 dark:text-stone-100 border-slate-700 dark:border-slate-200'>
                <div className='mr-6'>
                  <p className='text-xl font-medium text-stone-700 dark:text-stone-100'>
                    Mesa: <span className='font-semibold'>01</span>
                  </p>
                  <Link href='/mesas' passHref>
                    <button className='border font-medium rounded py-2 px-6 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 focus:ring-4 focus:ring-opacity-50 focus:ring-yellow-500 text-stone-700 dark:text-stone-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-500 max-w-max mt-4'>
                      Seleccione su mesa
                    </button>
                  </Link>
                </div>
                <div>
                  <p className='text-xl font-medium text-stone-700 dark:text-stone-100'>
                    Total:{' '}
                    <span className='font-bold'>
                      {formatCurrency(totalPrice)}
                    </span>
                  </p>

                  <button
                    onClick={redirectToCheckout}
                    disabled={redirecting}
                    className='border font-semibold rounded py-2 px-6 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 hover:border-yellow-600 focus:ring-4 focus:ring-opacity-50 focus:ring-yellow-500 text-stone-700 dark:text-stone-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-500 max-w-max mt-4'
                  >
                    {redirecting ? 'Redirigiendo...' : 'Ir a pagar'}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default CartPage;
