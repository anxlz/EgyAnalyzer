'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <footer className="relative z-10 border-t border-border/40 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Disclaimer */}
          <p className={cn(
            'text-xs text-muted-foreground text-center sm:text-left max-w-lg leading-relaxed',
            isRTL ? 'font-cairo sm:text-right' : 'font-jakarta'
          )}>
            {t('disclaimer')}
          </p>

          {/* Right side */}
          <div className={cn('flex flex-col items-center sm:items-end gap-1', isRTL && 'sm:items-start')}>
            <p className={cn(
              'text-xs text-muted-foreground/60',
              isRTL ? 'font-cairo' : 'font-jakarta'
            )}>
              {t('copyright')}
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold-500',
                'transition-colors duration-200',
                isRTL ? 'font-cairo flex-row-reverse' : 'font-jakarta'
              )}
            >
              <Github className="w-3.5 h-3.5" />
              {t('github')}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />

        {/* Bottom — Pyramid motif */}
        <div className="flex justify-center mt-4" aria-hidden="true">
          <svg viewBox="0 0 60 30" className="w-12 h-6 text-gold-400/20" fill="currentColor">
            <polygon points="30,0 60,30 0,30" />
          </svg>
        </div>
      </div>
    </footer>
  );
}
