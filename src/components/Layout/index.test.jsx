import { BrowserRouter, Route, Routes } from "react-router-dom"
import { fireEvent, render, screen } from "@testing-library/react"

import { Layout } from "."
import { HomePage } from "../../Pages/Home"
import { AuthProvider } from "../../utils/context"


const username = 'springuser'
const token = 'tokendetest'
const connectLabel = 'Se connecter'
const disconnectLabel = 'Se déconnecter'

function renderApp() {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}


describe('User connection', () => {
  it('renders without crashing', () => {
    renderApp()
    
    expect(screen.getByText(connectLabel).textContent).toBeDefined()
  })

  test('that for a connected user, its name appears', () => {
    
    localStorage.setItem('user',JSON.stringify({
      user: username,
      token: token,
      expires: Date.now() +7200 * 1000
    }))

    renderApp()
      
    expect(screen.getByText(disconnectLabel)).toBeDefined()
    expect(screen.getByText(username)).toBeDefined()
    fireEvent.click(screen.getByText(disconnectLabel))
  })

  test('disconnecting user, its name should not appear', () => {
    renderApp()
    
    expect(screen.getByText(connectLabel)).toBeDefined()
  })
})