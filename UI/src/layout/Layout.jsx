import React from "react"
import { Header } from "../components/Header"
import NavbarComponent from "../components/NavbarComponent"

const Layout = ({ children, RightPanel }) => {
  return (
    <div className="grid grid-cols-1 grid-rows-12 min-h-screen">
      <div className=" col-span-1 row-span-1 fixed z-10 w-full">
        <NavbarComponent />
      </div>
      <div className="bg-gray-200 col-span-1 row-span-11 mt-20 ">
        {children}
      </div>
      <div className="bg-gray-800 col-span-1 row-span-1 flex items-center justify-center text-white text-lg fixed w-full left-0 bottom-0">
        <Header />
      </div>
    </div>
  )
}

export default Layout
