import { createContext, useState } from 'react';

const UserContext = createContext({
  mail: null,
  name: null,
  setUser: (mail: string, name: string) => {},
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

const UserProvider = ({ children }: Props): JSX.Element => {
  const [mail, setMail] = useState(null);
  const [name, setName] = useState(null);

  const setUser = (mail: string, name: string): void => {
    setMail(mail);
    setName(name);
  };

  return (
    <UserContext.Provider
      value={{
        mail,
        name,
        setUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
