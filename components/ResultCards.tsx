'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  User,
  Calendar,
  MapPin,
  Clock,
  Shield,
  RefreshCw,
  Copy,
  Check,
  Baby,
  UserCheck,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import type { IDParseResult } from '@/types';
import { formatBirthDate } from '@/lib/id-parser';
import { cn } from '@/lib/utils';

interface ResultCardsProps {
  result: IDParseResult;
  idValue: string;
  locale: string;
  onReset: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
  }),
};

interface DataCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  colorClass: string;
  index: number;
  isRTL: boolean;
  subValue?: string;
}

function DataCard({ icon, label, value, colorClass, index, isRTL, subValue }: DataCardProps) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'rounded-xl border p-4 sm:p-5',
        'glass-card transition-all duration-300',
        'hover:scale-[1.02] hover:shadow-lg cursor-default',
        colorClass
      )}
      role="article"
      aria-label={`${label}: ${value}`}
    >
      <div className={cn('flex items-start gap-3', isRTL && 'flex-row-reverse')}>
        <div className="flex-shrink-0 mt-0.5 opacity-80">{icon}</div>
        <div className={cn('flex-1 min-w-0', isRTL && 'text-right')}>
          <p className={cn(
            'text-xs font-medium text-muted-foreground mb-1',
            isRTL ? 'font-cairo' : 'font-jakarta'
          )}>
            {label}
          </p>
          <p className={cn(
            'text-lg sm:text-xl font-bold text-foreground leading-tight',
            isRTL ? 'font-cairo' : 'font-jakarta'
          )}>
            {value}
          </p>
          {subValue && (
            <p className={cn(
              'text-xs text-muted-foreground mt-1',
              isRTL ? 'font-cairo' : 'font-jakarta'
            )}>
              {subValue}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ResultCards({ result, idValue, locale, onReset }: ResultCardsProps) {
  const t = useTranslations('results');
  const isRTL = locale === 'ar';
  const [copied, setCopied] = useState(false);

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(idValue);
      setCopied(true);
      toast.success(t('copied'), { duration: 2000 });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  if (!result.valid) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'rounded-2xl border border-destructive/30 p-6 sm:p-8',
          'glass-card',
          'bg-destructive/5'
        )}
        role="alert"
        aria-live="assertive"
      >
        <div className={cn('flex items-center gap-3 mb-4', isRTL && 'flex-row-reverse')}>
          <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h2 className={cn(
              'text-xl font-bold text-destructive',
              isRTL ? 'font-cairo' : 'font-cinzel'
            )}>
              {t('invalid')}
            </h2>
            <p className={cn(
              'text-sm text-muted-foreground mt-1',
              isRTL ? 'font-cairo' : 'font-jakarta'
            )}>
              {t('subtitle')}
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium',
            'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
            'border border-border/50 transition-all duration-200',
            isRTL ? 'font-cairo flex-row-reverse' : 'font-jakarta'
          )}
        >
          <RefreshCw className="w-4 h-4" />
          {t('tryAnother')}
        </motion.button>
      </motion.div>
    );
  }

  const birthDateFormatted = formatBirthDate(result.birthDate, locale);

  const cards = [
    {
      icon: <User className="w-5 h-5 text-nile-500 dark:text-nile-300" />,
      label: t('gender'),
      value: result.genderLabel,
      colorClass: result.gender === 'male' ? 'card-gender-male' : 'card-gender-female',
    },
    {
      icon: <Calendar className="w-5 h-5 text-green-500" />,
      label: t('birthDate'),
      value: birthDateFormatted,
      colorClass: 'card-birth',
      subValue: result.birthDateText,
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-500" />,
      label: t('age'),
      value: `${result.age}`,
      colorClass: 'card-age',
      subValue: t('ageUnit'),
    },
    {
      icon: <MapPin className="w-5 h-5 text-gold-500 dark:text-gold-400" />,
      label: t('governorate'),
      value: result.governorate,
      colorClass: 'card-gov',
    },
    {
      icon: <Shield className="w-5 h-5 text-amber-500" />,
      label: t('century'),
      value: result.century,
      colorClass: 'card-century',
    },
    {
      icon: result.isAdult
        ? <UserCheck className="w-5 h-5 text-emerald-500" />
        : <Baby className="w-5 h-5 text-rose-400" />,
      label: t('isAdult'),
      value: result.isAdult ? t('adult') : t('minor'),
      colorClass: result.isAdult ? 'card-birth' : 'card-gender-female',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          'rounded-2xl border border-green-500/25 p-4 sm:p-6',
          'glass-card',
          'bg-green-500/5'
        )}
      >
        <div className={cn(
          'flex items-center justify-between gap-4',
          isRTL && 'flex-row-reverse'
        )}>
          <div className={cn('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
            >
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </motion.div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h2 className={cn(
                'text-lg sm:text-xl font-bold text-green-600 dark:text-green-400',
                isRTL ? 'font-cairo' : 'font-cinzel'
              )}>
                {t('title')}
              </h2>
              <p className={cn(
                'text-xs text-muted-foreground mt-0.5',
                isRTL ? 'font-cairo' : 'font-jakarta'
              )}>
                {t('subtitle')}
              </p>
            </div>
          </div>

          {/* Formatted ID + Copy */}
          <div className={cn('flex items-center gap-2', isRTL && 'flex-row-reverse')}>
            <code className="text-xs sm:text-sm font-mono bg-secondary px-3 py-1.5 rounded-lg text-foreground hidden sm:block">
              {result.formattedId}
            </code>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyId}
              aria-label={t('copyId')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium',
                'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
                'border border-border/50 transition-all duration-200',
                isRTL ? 'font-cairo flex-row-reverse' : 'font-jakarta'
              )}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">
                {copied ? t('copied') : t('copyId')}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Data Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {cards.map((card, i) => (
          <DataCard
            key={card.label}
            index={i}
            icon={card.icon}
            label={card.label}
            value={card.value}
            colorClass={card.colorClass}
            isRTL={isRTL}
            subValue={(card as { subValue?: string }).subValue}
          />
        ))}
      </div>

      {/* Try Another Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className={cn('flex', isRTL ? 'justify-end' : 'justify-start')}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className={cn(
            'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium',
            'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
            'border border-border/50 transition-all duration-200',
            isRTL ? 'font-cairo flex-row-reverse' : 'font-jakarta'
          )}
        >
          <RefreshCw className="w-4 h-4" />
          {t('tryAnother')}
        </motion.button>
      </motion.div>
    </div>
  );
}
