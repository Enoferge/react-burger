export const ACCESS_TYPE = {
  ANY: 'any',
  AUTH: 'auth',
  GUEST: 'guest',
} as const;

export type AccessType = (typeof ACCESS_TYPE)[keyof typeof ACCESS_TYPE];
