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
  userId: string;
};
//FormDataEntryValue;
export type CardFormData = {
  frontItem: string;
  frontPronunciation?: string;
  frontExample?: string;
  backItem: string;
  backPronunciation?: string;
  backExample?: string;
};

// export type CardFormData = {
//   frontItem: FormDataEntryValue;
//   frontPronunciation?: FormDataEntryValue | string | null;
//   frontExample?: FormDataEntryValue | string | null;
//   backItem: FormDataEntryValue;
//   backPronunciation?: FormDataEntryValue | string | null;
//   backExample?: FormDataEntryValue | string | null;
// };
