// Import the required React dependencies, routing components, and icons
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

// Import the required data and components from external files
import { links } from "data/dummy";
import { useStateContext } from 'contexts/ContextProvider'

// Define the Sidebar functional component
export default function Sidebar() {
  // Declare constant values for active and normal link CSS classes
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const handleCloseSidebar = () => {
    if(activeMenu && screenSize < 900) setActiveMenu(false)
  }
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 bg-cyan-200 rounded-lg text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-grap-700 dark:text-gray-200 dark:hover:text-black hover:bg-slate-200 m-2";

  // Return the JSX markup for the sidebar component
  return (
    <aside
      className="ml-3 h-screen md:overflow-hidden overflow-auto 
    md:hover:overflow-auto pb-10"
    >
      {/* Conditionally render the active menu */}
      {activeMenu && (
        <>
          <div className="flex justify-between items-center bg-">
            {/* Link to the homepage and apply CSS classes for styling */}
            <Link
              to="/"
              onClick={handleCloseSidebar}
              className="items-center 
            gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight 
            dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Shoppy</span>
            </Link>

            {/* Add a tooltip and cancel button for the menu on mobile devices */}
            <TooltipComponent content="menu" position="BottomCenter">
              <button
                className="text-xl rounded-full p-3 hover:bg-slate-200 
              mt-4 block md:hidden"
                type="button"
                onClick={() =>
                  setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                }
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          {/* Render a list of links based on the imported 'links' data */}
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                {/* Display the link category title in uppercase */}
                <p className="text-gray-400 m-3 mt-4 uppercase">
                  {item.title}{" "}
                </p>

                {/* Map over the individual links within the category */}
                {item.links.map((link) => (
                  // Render the NavLink component with appropriate styling
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSidebar}
                    className={({ isActive }) => {
                      return isActive ? activeLink : normalLink;
                    }}
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
