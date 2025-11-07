import { Language, User } from '@/app/lib/types';
import { JSX } from 'react';
import Flag from 'react-world-flags';

export const getFlags = (
  user: User | null | undefined,
  height: string
): JSX.Element[] => {
  const activeLanguage = user?.activeLanguage;
  if (!activeLanguage) {
    return [
      <Flag
        code={'--'}
        fallback='--'
        style={{ display: 'inline', padding: '2px', height: height }}
      />,
      <Flag
        code={'--'}
        fallback='--'
        style={{ height: height, display: 'inline', padding: '2px' }}
      />,
    ];
  }
  const flagCode = [];
  flagCode[0] = activeLanguage.firstLanguage.slice(0, 2) || '';
  flagCode[1] = activeLanguage.secondLanguage.slice(0, 2) || '';

  const flag1 = (
    <Flag
      code={flagCode[0]}
      fallback={<span>{flagCode[0]}</span>}
      style={{ height: height, display: 'inline', padding: '2px' }}
    />
  );
  const flag2 = (
    <Flag
      code={flagCode[1]}
      fallback={<span>{flagCode[1]}</span>}
      style={{ height: height, display: 'inline', padding: '2px' }}
    />
  );
  return [flag1, flag2];
};
