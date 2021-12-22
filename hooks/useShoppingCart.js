import { TYPES } from '../actions/shoppingActions';
import useLocalStorageReducer from './useLocalStorageReducer';
import { createContext, useMemo, useContext } from 'react';

export const products = [
  {
    id: 'price_1K9KjTKfLWhjfm3aPRArFor9',
    name: 'Pachamanca con una presa',
    price: 2200,
    currency: 'PEN',
    description:
      '3 papas, Porción de habas, 1 humita, 1 presa (pollo, chancho, carnero)',
    image: '/saucer/pachamanca1.png',
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
    image: '/saucer/pachamanca2.png',
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
    image: '/saucer/pachamanca3.png',
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
    image: '/saucer/pachamanca4.png',
    rating: {
      count: 100,
      rate: 4.9
    }
  }
];

export const shoppingInitialState = {
  products,
  cart: [],
  cartCount: 0,
  totalPrice: 0,
  desk: ''
};

export function shoppingReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
      let newItem = state.products.find(
        (product) => product.id === action.payload.id
      );

      let itemInCart = state.cart.find((item) => item.id === newItem.id);

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + action.payload.qty }
                : item
            ),
            cartCount: Math.max(0, state.cartCount + action.payload.qty),
            totalPrice: Math.max(
              state.totalPrice + newItem.price * action.payload.qty
            )
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, quantity: action.payload.qty }],
            cartCount: Math.max(0, state.cartCount + action.payload.qty),
            totalPrice: Math.max(
              state.totalPrice + newItem.price * action.payload.qty
            )
          };
    }
    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload);

      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
            cartCount: Math.max(0, state.cartCount - 1),
            totalPrice: Math.max(0, state.totalPrice - itemToDelete.price)
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
            cartCount: Math.max(0, state.cartCount - 1),
            totalPrice: Math.max(0, state.totalPrice - itemToDelete.price)
          };
    }
    case TYPES.REMOVE_ALL_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload);

      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
        cartCount: Math.max(0, state.cartCount - itemToDelete.quantity),
        totalPrice: Math.max(
          0,
          state.totalPrice - itemToDelete.price * itemToDelete.quantity
        )
      };
    }
    case TYPES.CLEAR_CART:
      return shoppingInitialState;
    default:
      return state;
  }
}

// Context + Provider
const CartContext = createContext();

export const CartProvider = ({ currency = 'USD', children }) => {
  const [cart, dispatch] = useLocalStorageReducer(
    'cart',
    shoppingReducer,
    shoppingInitialState
  );

  const contextValue = useMemo(
    () => [
      {
        ...cart,
        currency
      },
      dispatch
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart, currency]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const [cart, dispatch] = useContext(CartContext);

  const addItem = (id, qty = 1) =>
    dispatch({ type: TYPES.ADD_TO_CART, payload: { id, qty } });

  const removeItem = (id, all = false) => {
    if (all) {
      dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
    } else {
      dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
    }
  };

  const clearCart = () => dispatch({ type: TYPES.CLEAR_CART });

  const shoppingCart = {
    ...cart,
    addItem,
    removeItem,
    clearCart
  };

  return shoppingCart;
};
