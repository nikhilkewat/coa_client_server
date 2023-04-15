/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../redux/actions/auth";
import { useLocalStorage } from "./useLocalStorage";

interface AuthContextType {
  data: any;
  user: any;
  signin: (user: any, callback: any) => void;
  signout: (callback: any) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({ children, userData }: any) => {
  let [user, setUser] = useLocalStorage("user", userData);
  const [data, setData] = React.useState<any>(null);
  const dispatch = useDispatch<any>();

  let signin = (newUser: any, callback: any) => {
    dispatch(
      login(
        newUser,
        (res: any) => {
          setUser(res);
          setData(res.data);
          callback(res);
        },
        (res: any) => {
          toast.warning(res.message);
        }
      )
    );
  };
  let signout = (callback: VoidFunction) => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setData(null);
    callback();
  };

  let value = useMemo(
    () => ({
      user,
      signin,
      signout,
      data
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
