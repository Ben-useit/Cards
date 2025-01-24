import { clerkClient } from '@clerk/nextjs/server';
import { getSelectedLanguage } from './actions';

export const getMetadata = async (userId: string | null) => {
  if (!userId) return { langId: '', label: '' };
  const client = await clerkClient();
  const { publicMetadata } = await client.users.getUser(userId as string);
  if (!publicMetadata.langId || publicMetadata.langId === '') {
    const language = await getSelectedLanguage(userId);
    if (!language) return { langId: '', label: '' };
    await setMetadata({ userId, langId: language.id, label: language.label });
    return { langId: language.id, label: language.label };
  }
  const langId = publicMetadata?.langId || '';
  const label = publicMetadata?.label || '';
  return { langId, label };
};

export const deleteMetadata = async (userId: string) => {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { label: '', langId: '' },
  });
};
export const setMetadata = async ({
  userId,
  langId,
  label,
}: {
  userId: string;
  langId: string;
  label: string;
}) => {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { langId: langId, label: label },
  });
};
