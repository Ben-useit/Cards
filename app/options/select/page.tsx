import { getSession } from '@/app/lib/session';
import LanguageForm from '@/components/LanguageForm';
import { prisma } from '@/prisma/prisma';
const LanguageSelectPage = async () => {
  const session = await getSession();
  if (!session) return;

  const languages = await prisma.language.findMany({
    where: {
      userId: session.user.userId,
    },
  });
  return <LanguageForm languages={languages} user={session.user} />;
};
export default LanguageSelectPage;
