import pachamanca1 from 'assets/pachamanca1.png';
import pachamanca2 from 'assets/pachamanca2.png';
import pachamanca3 from 'assets/pachamanca3.png';
import pachamanca4 from 'assets/pachamanca4.png';
import type { NextPage } from 'next';
import Image from 'next/image';

export const products = [
  {
    id: 'price_1K9KjTKfLWhjfm3aPRArFor9',
    name: 'Pachamanca con una presa',
    price: 2200,
    currency: 'PEN',
    description:
      '3 papas, Porción de habas, 1 humita, 1 presa (pollo, chancho, carnero)',
    image: pachamanca1,
    rating: {
      count: 100,
      rate: 4.5
    }
  },
  {
    id: 'price_1K9KmIKfLWhjfm3akh4Gdm3U',
    name: 'Pachamanca con dos presas',
    price: 3100,
    currency: 'PEN',
    description:
      '3 papas, Porción de habas, 1 humita, 2 presas (pollo, chancho, carnero)',
    image: pachamanca2,
    rating: {
      count: 90,
      rate: 4.5
    }
  },
  {
    id: 'price_1K9KnZKfLWhjfm3apt7slt8j',
    name: 'Pachamanca con tres presas',
    price: 4000,
    currency: 'PEN',
    description:
      '3 papas, Porción de habas, 1 humita, 3 presas (pollo, chancho, carnero)',
    image: pachamanca3,
    rating: {
      count: 90,
      rate: 4.6
    }
  },
  {
    id: 'price_1K9KpqKfLWhjfm3aIhOctGL6',
    name: 'Pachamanca con presa de cuy',
    price: 3100,
    currency: 'PEN',
    description: '3 papas, Porción de habas, 1 humita, 1 presa (cuy)',
    image: pachamanca4,
    rating: {
      count: 100,
      rate: 4.9
    }
  }
];

const ProductPage: NextPage = () => {
  return (
    <>
      {products.map((product) => (
        <Image key={product.id} src={product.image} alt={product.name} />
      ))}
    </>
  );
};

export default ProductPage;
