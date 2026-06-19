import { createRoot } from 'react-dom/client'
import "./index.css"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import HomePage from './pages/home'
import { Layout } from './layout'
import ProfilePage from './pages/profile'
import { LayoutWithSidebar } from './LayoutWithSidebar'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'

createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route element={<LayoutWithSidebar />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      </Route>
      <Route element={<Layout />}>
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Route>
    </Routes>
  </Router>
)
