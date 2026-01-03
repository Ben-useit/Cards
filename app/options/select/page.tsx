import LanguageForm from '@/components/LanguageForm';

import { getLanguagePairs } from '@/lib/api/language';
const LanguageSelectPage = async () => {
  const languages = await getLanguagePairs();
  return <LanguageForm languages={languages} />;
};
export default LanguageSelectPage;
