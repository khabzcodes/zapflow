'use client';
import { useTheme } from 'next-themes';
import { Icons } from '../ui/icons';
import { Button } from '../ui/button';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="mr-1">
      {theme === 'light' ? (
        <Button
          variant="ghost"
          onClick={() => setTheme('dark')}>
          <Icons.moon className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          onClick={() => setTheme('light')}>
          <Icons.sun className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
