export const ACCESS_TYPE = {
  ANY: 'any',
  AUTH: 'auth',
  GUEST: 'guest',
} as const;

export type TAccessType = (typeof ACCESS_TYPE)[keyof typeof ACCESS_TYPE];
