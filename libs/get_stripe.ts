import { loadStripe } from '@stripe/stripe-js';
import { PUBLISHABLE_KEY } from './enviroments';

let stripePromise: any = null;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;
