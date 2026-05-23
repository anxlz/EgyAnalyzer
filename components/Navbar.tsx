'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Moon, Sun, Monitor, Globe, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isRTL = locale === 'ar';

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = () => {
    const next = locale === 'en' ? 'ar' : 'en';
    // Replace current locale prefix in pathname
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/') || `/${next}`);
  };

  const themeOptions = [
    { value: 'light', icon: Sun, label: t('theme.light') },
    { value: 'dark', icon: Moon, label: t('theme.dark') },
    { value: 'system', icon: Monitor, label: t('theme.system') },
  ] as const;

  const cycleTheme = () => {
    const order: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
    const curr = (theme as 'light' | 'dark' | 'system') ?? 'system';
    const next = order[(order.indexOf(curr) + 1) % order.length];
    setTheme(next);
  };

  const ThemeIcon =
    themeOptions.find((o) => o.value === theme)?.icon ?? Monitor;
  const isDark = resolvedTheme === 'dark';

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'glass-card border-b border-border/60 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className={cn('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
            {/* Egyptian Eye SVG Logo */}
            <div
              className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center',
                'bg-gradient-to-br from-gold-400 to-gold-600 shadow-md'
              )}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-white"
                aria-hidden="true"
              >
                <path
                  d="M12 4L22 20H2L12 4Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="15" r="2.5" fill="currentColor" />
              </svg>
            </div>
            <div className={cn(isRTL ? 'text-right' : 'text-left')}>
              <p className="font-cinzel text-sm font-600 leading-none tracking-wide text-foreground">
                {t('title')}
              </p>
              <p className="text-xs text-muted-foreground leading-none mt-0.5 font-cairo">
                {t('subtitle')}
              </p>
            </div>
          </div>

          {/* Desktop Controls */}
          <div className={cn('hidden sm:flex items-center gap-2', isRTL && 'flex-row-reverse')}>
            {/* Language Switch */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={switchLocale}
              aria-label={t('theme.toggle')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium',
                'bg-secondary/60 hover:bg-secondary text-secondary-foreground',
                'border border-border/50 hover:border-gold-400/40',
                'transition-all duration-200',
                isRTL ? 'font-cairo' : 'font-jakarta'
              )}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t('langSwitch')}</span>
            </motion.button>

            {/* Theme Toggle */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={cycleTheme}
                aria-label={t('theme.toggle')}
                className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center',
                  'bg-secondary/60 hover:bg-secondary text-secondary-foreground',
                  'border border-border/50 hover:border-gold-400/40',
                  'transition-all duration-200'
                )}
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 30, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ThemeIcon className="w-4 h-4" />
                </motion.div>
              </motion.button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="sm:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden py-3 border-t border-border/50 flex flex-col gap-2"
          >
            <button
              onClick={() => { switchLocale(); setMobileOpen(false); }}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium w-full',
                isRTL ? 'justify-end font-cairo' : 'justify-start',
                'bg-secondary/60 text-secondary-foreground hover:bg-secondary'
              )}
            >
              <Globe className="w-4 h-4" />
              {t('langSwitch')}
            </button>
            {mounted && (
              <button
                onClick={() => { cycleTheme(); setMobileOpen(false); }}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium w-full',
                  isRTL ? 'justify-end font-cairo' : 'justify-start',
                  'bg-secondary/60 text-secondary-foreground hover:bg-secondary'
                )}
              >
                <ThemeIcon className="w-4 h-4" />
                {themeOptions.find((o) => o.value === theme)?.label ?? t('theme.system')}
              </button>
            )}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
