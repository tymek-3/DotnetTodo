export const auth = (token: string) => {
  return {
    Authorization: `bearer ${token}`,
  };
};
