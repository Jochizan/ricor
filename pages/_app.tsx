import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Header from 'layouts/Header';
import Footer from 'layouts/Footer';
import { CartProvider } from '../hooks/useShoppingCart';
import { Toaster } from 'react-hot-toast';

const App = ({ Component, pageProps, router: { route } }: AppProps) => {
  if (route.includes('/auth')) {
    return (
      <ThemeProvider enableSystem={true} attribute='class'>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider enableSystem={true} attribute='class'>
      <CartProvider currency='PEN'>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </CartProvider>
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
