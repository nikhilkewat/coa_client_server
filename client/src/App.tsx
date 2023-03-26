import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import AuthLayout from "./layout/AuthLayout";
import { AuthProvider, RequireAuth } from "./components/Login/AuthProvider";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
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
            <Route
              path="/app/*"
              element={
                <RequireAuth>
                  <AuthLayout />
                </RequireAuth>
              }
            />
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
