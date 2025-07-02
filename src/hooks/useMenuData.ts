import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags?: string[];
  bestSeller?: boolean;
  trending?: boolean;
  recommendations?: string[];
  category?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

export type MenuData = {
  categories: MenuCategory[];
};

export function useMenuData() {
  const [data, setData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let menuImport;
      switch (i18n.language) {
        case 'pl':
          menuImport = import('../data/menu.json');
          break;
        case 'uk':
          menuImport = import('../data/menu.uk.json');
          break;
        default:
          menuImport = import('../data/menu.en.json');
      }
      menuImport
        .then((mod) => {
          setData((mod.default || mod) as MenuData);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }, 1000);
    // Re-run when language changes
  }, [i18n.language]);

  return { data, loading, error };
} 