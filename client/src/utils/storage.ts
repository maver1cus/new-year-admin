export const Storage = {
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },
  setToken: (token: string): void => {
    localStorage.setItem('token', token);
  },
};
