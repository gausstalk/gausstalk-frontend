import { createContext, useState } from 'react';

const TokenContext = createContext({
  token: null,
  setToken: (token: string) => {},
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const TokenProvider = ({ children }: Props): JSX.Element => {
  const [token, setTokenState] = useState(null);

  const setToken = (token: string): void => {
    setTokenState(token);
  };

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
      }}>
      {children}
    </TokenContext.Provider>
  );
};

export { TokenContext, TokenProvider };