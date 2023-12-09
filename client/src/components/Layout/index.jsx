// ./src/components/Layout/index.jsx

import { Outlet } from "react-router-dom"

import Header from "./Header"
import Footer from "./Footer"
import { Toaster } from "react-hot-toast"
function Layout() {
  return (
    <>
      <Toaster position="top-right" />
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Layout
