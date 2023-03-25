import React, { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/Login";
import AuthLayout from "./layout/AuthLayout";
import { fakeAuthProvider } from "./auth";
import { ToastContainer } from "react-toastify";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-datepicker/dist/react-datepicker.css";
import "./css/ag-theme.css";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <div className="themeWrapper">
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/app/*" element={<AuthLayout />} />
          </Routes>
        </Suspense>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          theme="colored"
        ></ToastContainer>
      </div>
    </AuthProvider>
  );
}

export default App;

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);
export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
