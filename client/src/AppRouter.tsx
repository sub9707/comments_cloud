import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import LoginPage from "@pages/Login/LoginPage";
import Logout from "@pages/Logout/Logout";
import React, { Suspense } from "react";
import GlobalModal from "@components/Modals/GlobalModal";
import LoadingPage from "@pages/LoadingPage";
import GlobalAlert from "@components/Modals/GlobalAlert";
import { store } from "./store";

const isPasswordAuthed = store.getState().PasswordCheckedSlice.Authenticated;

console.log(isPasswordAuthed);

const loading = (
  <div style={{ width: "100%", height: "100vh", opacity: 0.5 }}>
    <LoadingPage />
  </div>
);

// Container
const DefaultLayout = React.lazy(() => import("@pages/PageLayout"));
const AdminPageLayout = React.lazy(
  () => import("@pages/Admin/AdminPageLayout")
);
// Util Pages
const PageNotFound = React.lazy(() => import("@pages/NotFoundPage"));
const Unauthorized = React.lazy(() => import("@components/Utils/Unauthorized"));
const PasswordConfirm = React.lazy(
  () => import("@pages/Profile/PasswordConfirm")
);
const PasswordChange = React.lazy(
  () => import("@pages/Profile/PasswordChange")
);

// Main
const MainComp = React.lazy(() => import("@pages/MainPage/MainPage"));
const NoticePage = React.lazy(() => import("@pages/Notice/NoticePage"));
const Service = React.lazy(() => import("@pages/Service/ServicePage"));
// Admin
const AdminMain = React.lazy(() => import("@pages/Admin/AdminMainPage"));
const AdminUser = React.lazy(() => import("@pages/Admin/AdminUserPage"));
const AdminBoard = React.lazy(() => import("@pages/Admin/AdminBoardPage"));
const AdminNotice = React.lazy(() => import("@pages/Admin/AdminNoticePage"));
const AdminNoticeWrite = React.lazy(
  () => import("@pages/Admin/AdminNoticeWrite")
);
// MyError
const MyError = React.lazy(() => import("@pages/myError/MyErrorPage"));
const ErrorWrite = React.lazy(() => import("@pages/myError/ErrorWrite"));
const MyErrorSearch = React.lazy(() => import("@pages/myError/MyErrorSearch"));
const MyErrorEdit = React.lazy(() => import("@pages/myError/MyErrorEdit"));
const MyErrorView = React.lazy(() => import("@pages/myError/ErrorView"));
// UserProfile
const UserProfileFixPage = React.lazy(
  () => import("@pages/Profile/UserProfileFix")
);
const UserProfilePage = React.lazy(() => import("@pages/Profile/UserProfile"));
// BoardPage
const BoardPage = React.lazy(() => import("@pages/Board/BoardPage"));
const BoardSearchPage = React.lazy(
  () => import("@pages/Board/BoardSearchPage")
);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <GlobalModal />
        <GlobalAlert />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<MainComp />} />
            <Route path="service" element={<Service />} />
            <Route path="notice" element={<NoticePage />} />
            <Route path="board">
              <Route index element={<BoardPage />} />
              <Route path="search" element={<BoardSearchPage />} />
            </Route>
            <Route path="myError">
              <Route index element={<MyError />} />
              <Route path="search" element={<MyErrorSearch />} />
              <Route path="edit/:boardId" element={<MyErrorEdit />} />
              <Route path=":boardId" element={<MyErrorView />} />
            </Route>
            <Route path="ErrorWrite" element={<ErrorWrite />} />
            <Route path="user">
              <Route path=":userId" element={<UserProfilePage />} />
              <Route path="edit/:userId" element={<UserProfileFixPage />} />
            </Route>
            <Route
              path="passwordChange"
              element={
                isPasswordAuthed ? (
                  <PasswordChange />
                ) : (
                  <Navigate to="/passwordConfirm" />
                )
              }
            />
            <Route path="passwordConfirm" element={<PasswordConfirm />} />
          </Route>
          // Admin Page
          <Route path="/admin" element={<AdminPageLayout />}>
            <Route index element={<AdminMain />} />
            <Route path="user" element={<AdminUser />} />
            <Route path="board" element={<AdminBoard />} />
            <Route path="notice" element={<AdminNotice />} />
            <Route path="notice/write" element={<AdminNoticeWrite />} />
          </Route>
          // 404 page
          <Route path="*" element={<PageNotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
