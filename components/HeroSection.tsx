'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Shield, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section
      className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-10 sm:pt-24 sm:pb-16"
      aria-labelledby="hero-title"
    >
      <div className="container mx-auto max-w-4xl text-center">
        {/* Eyebrow */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-5"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-400/60" />
          <span
            className={cn(
              'text-xs font-semibold tracking-[0.2em] uppercase',
              'text-gold-500 dark:text-gold-400',
              isRTL ? 'font-cairo tracking-normal' : 'font-jakarta'
            )}
          >
            {t('eyebrow')}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-400/60" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          id="hero-title"
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn(
            'text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-3',
            isRTL ? 'font-cairo' : 'font-cinzel'
          )}
        >
          <span className="text-foreground">{t('title')} </span>
          <span className="gold-shimmer">{t('titleAccent')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={cn(
            'text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8',
            isRTL ? 'font-cairo' : 'font-jakarta'
          )}
        >
          {t('subtitle')}
        </motion.p>

        {/* Badges */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {/* Privacy Badge */}
          <div
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium',
              'bg-gold-400/10 dark:bg-gold-400/10 text-gold-700 dark:text-gold-400',
              'border border-gold-400/20 dark:border-gold-400/25',
              isRTL ? 'font-cairo flex-row-reverse' : 'font-jakarta'
            )}
          >
            <Shield className="w-3.5 h-3.5 flex-shrink-0" />
            {t('badge')}
          </div>

          {/* Speed Badge */}
          <div
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium',
              'bg-nile-500/10 text-nile-600 dark:text-nile-300',
              'border border-nile-500/20',
              isRTL ? 'font-cairo flex-row-reverse' : 'font-jakarta'
            )}
          >
            <Zap className="w-3.5 h-3.5 flex-shrink-0" />
            {t('secureBadge')}
          </div>
        </motion.div>
      </div>

      {/* Decorative separator */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-12 max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent"
      />
    </section>
  );
}
