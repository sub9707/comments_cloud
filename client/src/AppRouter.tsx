import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import MainPage from "./pages/PageLayout";
import Logout from "./pages/Logout/Logout";
import { isLoggedIn } from "./store/Cookie";
import React, { Suspense } from "react";
import { Spinner } from "react-bootstrap";

const loading = (
  <>
    <Spinner animation="grow" />
  </>
);

// Container
const DefaultLayout = React.lazy(() => import("./pages/PageLayout"));
const AdminPageLayout = React.lazy(
  () => import("./pages/Admin/AdminPageLayout")
);
// Pages
//Admin
const AdminMain = React.lazy(() => import("./pages/Admin/AdminMainPage"));
const AdminUser = React.lazy(() => import("./pages/Admin/AdminUserPage"));
const AdminBoard = React.lazy(() => import("./pages/Admin/AdminBoardPage"));
const AdminNotice = React.lazy(() => import("./pages/Admin/AdminNoticePage"));

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
          <Route path="/" element={<DefaultLayout />} />
          <Route path="/admin" element={<AdminPageLayout />}>
            <Route index element={<AdminMain />} />
            <Route path="user" element={<AdminUser />} />
            <Route path="board" element={<AdminBoard />} />
            <Route path="notice" element={<AdminNotice />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
