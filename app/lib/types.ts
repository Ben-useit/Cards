export type Card = {
  id?: string;
  frontLanguage: string;
  frontItem: string;
  frontPronunciation?: string | null | undefined;
  frontExample?: string | null | undefined;
  frontStatus: number;
  backLanguage: string;
  backItem: string;
  backPronunciation?: string | null | undefined;
  backExample?: string | null | undefined;
  backStatus: number;
  userId: string;
  language: string;
};

export type LinkType = {
  label: string;
  url: string;
};

export type LanguagePair = {
  id: string;
  firstLanguage: string;
  secondLanguage: string;
  selected: boolean;
  label: string;
};

export type User = {
  userId: string;
  username: string;
  activeLanguage: Language | null;
};

export type Session = {
  user: User;
  expires: Date;
};

export type Language = {
  id: string;
  firstLanguage: string;
  secondLanguage: string;
  label: string;
  userId: string;
};
