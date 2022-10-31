import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function useDocumentTitle(title) {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = `${t(title)} | Abasare`;
  }, [title]);
}

export default useDocumentTitle;
