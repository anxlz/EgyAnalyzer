'use client';

import { useState, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { validateIdFormat } from '@/lib/id-parser';
import { cn } from '@/lib/utils';

interface IdInputProps {
  value: string;
  onChange: (v: string) => void;
  onAnalyze: (id: string) => void;
  onClear: () => void;
  isAnalyzing: boolean;
  hasResult: boolean;
  locale: string;
}

export function IdInput({
  value,
  onChange,
  onAnalyze,
  onClear,
  isAnalyzing,
  hasResult,
  locale,
}: IdInputProps) {
  const t = useTranslations('input');
  const isRTL = locale === 'ar';
  const inputRef = useRef<HTMLInputElement>(null);
  const [touched, setTouched] = useState(false);

  const validation = validateIdFormat(value);
  const showError = touched && value.length > 0 && !validation.valid;
  const showValid = value.length === 14 && validation.valid;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, '').slice(0, 14);
      onChange(raw);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && showValid && !isAnalyzing) {
        onAnalyze(value);
      }
    },
    [showValid, isAnalyzing, value, onAnalyze]
  );

  const handleAnalyzeClick = () => {
    setTouched(true);
    if (showValid) {
      onAnalyze(value);
    }
  };

  const handleClear = () => {
    onClear();
    setTouched(false);
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        'rounded-2xl border border-border/60 p-6 sm:p-8',
        'glass-card shadow-xl',
        'transition-all duration-300'
      )}
    >
      {/* Label */}
      <label
        htmlFor="national-id-input"
        className={cn(
          'block text-sm font-semibold text-foreground mb-3',
          isRTL ? 'font-cairo text-right' : 'font-jakarta text-left'
        )}
      >
        {t('label')}
      </label>

      {/* Input Row */}
      <div className="relative flex items-center gap-3">
        <div className="relative flex-1">
          {/* Input */}
          <input
            ref={inputRef}
            id="national-id-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={14}
            value={value}
            onChange={handleChange}
            onBlur={() => setTouched(true)}
            onKeyDown={handleKeyDown}
            placeholder={t('placeholder')}
            aria-label={t('placeholder')}
            aria-describedby="id-hint id-error"
            aria-invalid={showError}
            dir="ltr"
            className={cn(
              'id-input w-full rounded-xl border bg-background/50 px-4 py-4',
              'text-foreground placeholder:text-muted-foreground/40',
              'transition-all duration-200 outline-none',
              'focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400/60',
              showError
                ? 'border-destructive/60 bg-destructive/5'
                : showValid
                ? 'border-green-500/50 bg-green-500/5'
                : 'border-border/60 hover:border-gold-400/30',
              isRTL ? 'text-right' : 'text-left'
            )}
          />

          {/* Status icon inside input */}
          <div
            className={cn(
              'absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5',
              isRTL ? 'left-3' : 'right-3'
            )}
          >
            <AnimatePresence mode="wait">
              {showValid && !isAnalyzing && (
                <motion.div
                  key="valid"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </motion.div>
              )}
              {showError && (
                <motion.div
                  key="error"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <AlertCircle className="w-5 h-5 text-destructive" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Clear button */}
            {value && !isAnalyzing && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={handleClear}
                type="button"
                aria-label={t('clear')}
                className="w-5 h-5 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/30 flex items-center justify-center transition-colors"
              >
                <X className="w-3 h-3 text-muted-foreground" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Analyze Button */}
        <motion.button
          whileHover={{ scale: showValid && !isAnalyzing ? 1.03 : 1 }}
          whileTap={{ scale: showValid && !isAnalyzing ? 0.97 : 1 }}
          onClick={handleAnalyzeClick}
          disabled={!showValid || isAnalyzing}
          type="button"
          aria-label={isAnalyzing ? t('analyzing') : t('analyze')}
          className={cn(
            'flex items-center gap-2 px-5 py-4 rounded-xl font-semibold text-sm',
            'transition-all duration-200 whitespace-nowrap',
            showValid && !isAnalyzing
              ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-white shadow-lg shadow-gold-400/20 hover:shadow-gold-400/30 hover:from-gold-400 hover:to-gold-300'
              : 'bg-secondary text-muted-foreground cursor-not-allowed opacity-60',
            isRTL ? 'font-cairo flex-row-reverse' : 'font-jakarta'
          )}
        >
          {isAnalyzing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">
            {isAnalyzing ? t('analyzing') : t('analyze')}
          </span>
        </motion.button>
      </div>

      {/* Character counter + hint */}
      <div className={cn('flex items-center justify-between mt-3', isRTL && 'flex-row-reverse')}>
        <AnimatePresence mode="wait">
          {showError && validation.errorKey ? (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              id="id-error"
              role="alert"
              aria-live="polite"
              className={cn(
                'text-xs text-destructive flex items-center gap-1',
                isRTL ? 'font-cairo flex-row-reverse' : 'font-jakarta'
              )}
            >
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              {t(`errors.${validation.errorKey}` as Parameters<typeof t>[0])}
            </motion.p>
          ) : showValid ? (
            <motion.p
              key="valid"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'text-xs text-green-600 dark:text-green-400 flex items-center gap-1',
                isRTL ? 'font-cairo flex-row-reverse' : 'font-jakarta'
              )}
            >
              <CheckCircle2 className="w-3 h-3" />
              {t('valid')}
            </motion.p>
          ) : (
            <p
              id="id-hint"
              className={cn(
                'text-xs text-muted-foreground',
                isRTL ? 'font-cairo' : 'font-jakarta'
              )}
            >
              {t('hint')}
            </p>
          )}
        </AnimatePresence>

        {/* Digit counter */}
        <span
          className={cn(
            'text-xs tabular-nums',
            value.length === 14
              ? 'text-green-500 font-semibold'
              : value.length > 0
              ? 'text-gold-500'
              : 'text-muted-foreground/50'
          )}
        >
          {value.length}/14
        </span>
      </div>
    </div>
  );
}
