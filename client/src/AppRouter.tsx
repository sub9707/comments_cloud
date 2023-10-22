import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import Logout from "./pages/Logout/Logout";
import { isLoggedIn } from "./store/Cookie";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/login"
          element={isLoggedIn() ? <MainPage /> : <LoginPage />}
        />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}
