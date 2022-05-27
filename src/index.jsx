import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, BrowserRouter, Route } from "react-router-dom"

import './index.css'
import { AuthProvider } from './utils/context'
import { RequireAuth } from './services/auth.service'
import { LoginPage  } from './Pages/Login'
import { HomePage } from './Pages/Home'
import { RecettesPage } from './Pages/Recettes'
import { Layout } from './components/Layout'
import { RegisterPage } from './Pages/Register'
import Recette from './components/Recette'

import "primereact/resources/themes/lara-light-teal/theme.css"
import "primereact/resources/primereact.min.css"                
import "primeicons/primeicons.css"
import 'primeflex/primeflex.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/protected/recettes/:filter"
            element={
              <RequireAuth>
                <RecettesPage />
              </RequireAuth>
            }
          />
          {/* :filter handles recette id and "add" keyword for new recette */}
          <Route path="/protected/recette/:filter" 
            element={
              <RequireAuth>
                <Recette />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
