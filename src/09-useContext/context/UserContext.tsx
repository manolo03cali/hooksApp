import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { users, type User } from "../data/user-mock.data";

// interface UserContextProps {
//   children: React.ReactNode;
// }
type AuthStatus = "checking" | "not-authenticated" | "authenticated";
interface UserContextProps {
  //state
  authStatus: AuthStatus;
  user: User | null;
  isAuthenticated: boolean;

  //Methods
  login: (userId: number) => boolean;
  logout: () => void;
}

export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    if (!user) {
      setUser(null);
      setAuthStatus("not-authenticated");

      return false;
    }
    setAuthStatus("authenticated");
    localStorage.setItem("userId", userId.toString());
    setUser(user);

    return true;
  };
  const handleLogout = () => {
    setAuthStatus("not-authenticated");
    setUser(null);
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      handleLogin(+storedUserId);
      return;
    }
    handleLogout();
  }, []);

  return (
    <UserContext
      value={{
        authStatus: authStatus,
        isAuthenticated: authStatus === "authenticated",
        user: user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext>
  );
};
