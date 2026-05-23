'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PrivacyNotice() {
  const t = useTranslations('privacy');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section
      className="px-4 sm:px-6 lg:px-8 pb-12"
      aria-label="Privacy information"
    >
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn(
            'rounded-xl border border-gold-400/15 p-4 sm:p-5',
            'bg-gold-400/5 dark:bg-gold-400/5',
            'flex items-start gap-3',
            isRTL && 'flex-row-reverse'
          )}
        >
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-8 h-8 rounded-lg bg-gold-400/15 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-gold-400" />
            </div>
          </div>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className={cn(
              'text-sm font-semibold text-gold-700 dark:text-gold-400 mb-1',
              isRTL ? 'font-cairo' : 'font-jakarta'
            )}>
              {t('title')}
            </h3>
            <p className={cn(
              'text-xs text-muted-foreground leading-relaxed',
              isRTL ? 'font-cairo' : 'font-jakarta'
            )}>
              {t('body')}
            </p>
          </div>
          <Lock className="w-4 h-4 text-gold-400/50 flex-shrink-0 mt-1 hidden sm:block" />
        </motion.div>
      </div>
    </section>
  );
}
