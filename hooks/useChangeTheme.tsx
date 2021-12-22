import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const useChangeTheme = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <SunIcon
          className='w-8 h-8 text-stone-700 dark:text-stone-100'
          role='button'
          onClick={() => setTheme('light')}
        />
      );
    }

    return (
      <MoonIcon
        className='w-8 h-8 text-stone-700 dark:text-stone-100'
        role='button'
        onClick={() => setTheme('dark')}
      />
    );
  };

  return renderThemeChanger;
};

export default useChangeTheme;
