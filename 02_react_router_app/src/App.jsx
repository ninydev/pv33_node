import './App.css'
import {Link, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/static/AboutPage.jsx";
import ContactPage from "./pages/static/ContactPage.jsx";
import NotFoundPage from "./pages/shared/NotFoundPage.jsx";
import CatsPage from "./pages/cats/CatsPage.jsx";
import BlogPage from "./pages/blog/BlogPage.jsx";
import SinglePostPage from "./pages/blog/SinglePostPage.jsx";
import UsersListPage from "./pages/users/UsersListPage.jsx";
import UserCreatePage from "./pages/users/UserCreatePage.jsx";
import UserDetailsPage from "./pages/users/UserDetailsPage.jsx";
import UserEditPage from "./pages/users/UserEditPage.jsx";
import {ThemeProvider} from "./components/A11yComponents/useThemeContext.jsx";
import AccessibilityPanel from "./components/A11yComponents/AccessibilityPanelComponent.jsx";
import AdminDashboardComponent from "./components/AdminComponents/AdminDashboardComponent.jsx";

function App() {

  return (
    <>
        <ThemeProvider>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/admin'> Admin </Link></li>
                <li><Link to='/about'>About</Link> <a href="/about"> ab </a> </li>
                <li><Link to='/contact'>Contact</Link></li>
                <li><Link to='/cats'>Cats</Link></li>
                <li><Link to='/blog'>Blog</Link></li>
                <li><Link to='/users'>Users</Link></li>
            </ul>
        </nav>

        <main>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin/*" element={<AdminDashboardComponent />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cats" element={<CatsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<SinglePostPage />} />

                <Route path="users">
                    <Route index element={<UsersListPage />} />
                    <Route path="new" element={<UserCreatePage />} />
                    <Route path=":id" element={<UserDetailsPage />} />
                    <Route path=":id/edit" element={<UserEditPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </main>
        </ThemeProvider>
    </>
  )
}

export default App
