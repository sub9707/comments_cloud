import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import MainPage from "./pages/PageLayout";
import Logout from "./pages/Logout/Logout";
import { isLoggedIn } from "./store/Cookie";
import AdminMainPage from "./pages/Admin/AdminMain/AdminMainPage";
import React, { Suspense } from "react";

const loading = (
  <div>
    <p>임시 스피너</p>
  </div>
);

// Container
const DefaultLayout = React.lazy(() => import("./pages/PageLayout"));
const AdminPageLayout = React.lazy(
  () => import("./pages/Admin/AdminPageLayout")
);
// Pages

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn() ? <MainPage /> : <LoginPage />}
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<DefaultLayout />} />
          <Route path="/admin" element={<AdminPageLayout />}>
            <Route path="main" element={<AdminMainPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
