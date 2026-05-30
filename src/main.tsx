import { createRoot } from 'react-dom/client'
import "./index.css"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import HomePage from './pages/home'
import { Layout } from './layout'
import ProfilePage from './pages/profile'

createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      </Route>
    </Routes>
  </Router>
)
