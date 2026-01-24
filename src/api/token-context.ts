let currentToken: string | null = null;

export const tokenContext = {
  set: (token: string | null): void => {
    currentToken = token;
  },
  get: (): string | null => {
    return currentToken;
  },
  clear: (): void => {
    currentToken = null;
  },
};
