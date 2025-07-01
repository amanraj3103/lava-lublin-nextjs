'use client';

import { I18nextProvider } from 'react-i18next';
import { useEffect, useState } from 'react';
import i18n from '../i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialize i18n on client side
    if (!i18n.isInitialized) {
      i18n.init();
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
} 