import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecentAlbumsProvider } from "./context/RecentAlbumsContext";
import { HomePage } from "./pages/HomePage.tsx";
import { UsersPage } from "./pages/UsersPage.tsx";
import { UserDetailPage } from "./pages/UserDetailPage.tsx";

const App = () => (
  <BrowserRouter>
    <RecentAlbumsProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
      </Routes>
    </RecentAlbumsProvider>
  </BrowserRouter>
);

export default App;