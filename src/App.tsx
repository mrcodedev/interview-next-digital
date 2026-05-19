import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecentAlbumsProvider } from "./context/RecentAlbumsContext";
import { Layout } from "./components";
import { HomePage } from "./pages/HomePage";
import { UsersPage } from "./pages/UsersPage";
import { UserDetailPage } from "./pages/UserDetailPage";

const App = () => (
  <BrowserRouter>
    <RecentAlbumsProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </Layout>
    </RecentAlbumsProvider>
  </BrowserRouter>
);

export default App;
