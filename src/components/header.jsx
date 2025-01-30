import { useAuth } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Modern icons for the menu
import Profilecontainer from "./profilecontainer";
export default function Header() {
  const { userId } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

  const getLinkClass = ({ isActive }) =>
    `relative text-base text-neutral-600 transition duration-300 hover:text-neutral-900 
     after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-neutral-900 
     after:transition-all after:duration-300 hover:after:w-full 
     ${isActive ? "text-neutral-900 font-semibold after:w-full" : ""}`;

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex">
        <div className="flex items-center w-full py-4 gap-6">
          {/* LOGO */}
          <NavLink to="/">
            <img src="/assets/svg/logo.svg" className="h-12 w-12 object-contain " alt="Logo" />
          </NavLink>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-neutral-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />} {/* Toggle icon */}
          </button>

          {/* NAVIGATION (Desktop) */}
          <nav className="hidden md:flex items-center gap-5">
            <NavLink to="/" className={getLinkClass}>Home</NavLink>
            <NavLink to="/contact" className={getLinkClass}>Contact</NavLink>
            <NavLink to="/about" className={getLinkClass}>About</NavLink>
            <NavLink to="/services" className={getLinkClass}>Services</NavLink>

            {userId && (
              <NavLink to="/generate" className={getLinkClass}>
                Take An Interview
              </NavLink>
            )}
          </nav>
        </div>

        {/* NAVIGATION (Mobile) */}
        <div
          className={`absolute top-0 left-0 w-full bg-white shadow-md p-6 transform 
          ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} 
          transition-all duration-300 md:hidden`}
        >
          <nav className="flex flex-col gap-6 items-center">
            <NavLink to="/" className={getLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/contact" className={getLinkClass} onClick={() => setIsOpen(false)}>Contact</NavLink>
            <NavLink to="/about" className={getLinkClass} onClick={() => setIsOpen(false)}>About</NavLink>
            <NavLink to="/services" className={getLinkClass} onClick={() => setIsOpen(false)}>Services</NavLink>

            {userId && (
              <NavLink to="/generate" className={getLinkClass} onClick={() => setIsOpen(false)}>
                Take An Interview
              </NavLink>
            )}
            
          </nav>
        
        </div>
        <Profilecontainer/>
      </div>
    </header>
  );
}
