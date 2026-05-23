'use client';

import { useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { parseNationalId, validateIdFormat, formatBirthDate } from '@/lib/id-parser';
import type { IDParseResult } from '@/types';
import { IdInput } from './IdInput';
import { ResultCards } from './ResultCards';
import { cn } from '@/lib/utils';

export function IdAnalyzer() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [idValue, setIdValue] = useState('');
  const [result, setResult] = useState<IDParseResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const handleAnalyze = useCallback(async (id: string) => {
    setIsAnalyzing(true);
    setHasAnalyzed(false);

    // Simulate a brief processing delay for UX
    await new Promise((r) => setTimeout(r, 400));

    const lang = locale === 'ar' ? 'arabic' : 'english';
    const parsed = parseNationalId(id, lang);

    setResult(parsed);
    setIsAnalyzing(false);
    setHasAnalyzed(true);

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  }, [locale]);

  const handleClear = useCallback(() => {
    setIdValue('');
    setResult(null);
    setHasAnalyzed(false);
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-16" aria-label="ID Analyzer">
      <div className="container mx-auto max-w-2xl">
        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <IdInput
            value={idValue}
            onChange={setIdValue}
            onAnalyze={handleAnalyze}
            onClear={handleClear}
            isAnalyzing={isAnalyzing}
            hasResult={hasAnalyzed}
            locale={locale}
          />
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {hasAnalyzed && result !== null && (
            <motion.div
              id="results-section"
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8"
            >
              <ResultCards
                result={result}
                idValue={idValue}
                locale={locale}
                onReset={handleClear}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
