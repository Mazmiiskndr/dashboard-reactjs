import React, { useEffect } from "react";
// Import icons from React Icons
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
// Import TooltipComponent from Syncfusion package
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

// Import user avatar
import avatar from "data/avatar.jpg";

// Import components
import { Cart, Chat, Notification, UserProfile } from ".";
// Import context
import { useStateContext } from "../contexts/ContextProvider";

// Define NavButton component
const NavButton = ({ title, customFunc, icon, color, dotColor }) => {
  return (
    // Wrap button in a TooltipComponent for displaying tooltips
    <TooltipComponent content={title} position="BottomCenter">
      <button
        type="button"
        onClick={customFunc}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-slate-200"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full 
      h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </TooltipComponent>
  );
};

// Define Navbar component
export default function Navbar() {
  // Destructure context values
  const {
    // eslint-disable-next-line no-unused-vars
    activeMenu,
    setActiveMenu,
    isClicked,
    // eslint-disable-next-line no-unused-vars
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
  } = useStateContext();

  // Add event listener for window resize
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update activeMenu based on screenSize
  useEffect(() => {
    if (screenSize > 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize]);

  // Return the Navbar component
  return (
    <nav className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        customFunc={() => {
          setActiveMenu((prevActiveMenu) => !prevActiveMenu);
        }}
        color="blue"
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color="blue"
          icon={<FiShoppingCart />}
        />
        <NavButton
          title="Chat"
          dotColor="#03C9D7"
          customFunc={() => handleClick("chat")}
          color="blue"
          icon={<BsChatLeft />}
        />
        <NavButton
          title="Notifications"
          dotColor="#03C9D7"
          customFunc={() => handleClick("notification")}
          color="blue"
          icon={<RiNotification3Line />}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray
          rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img src={avatar} alt="Avatar" className="rounded-full w-8 h-8" />
            {/* Display greeting text and user's name */}
            <p>
              <span className="text-gray-400 text-14">Hi, </span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Michael
              </span>
            </p>
            {/* Display the dropdown arrow icon */}
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>
        {/* Conditionally render the Cart component */}
        {isClicked.cart && <Cart />}
        {/* Conditionally render the Chat component */}
        {isClicked.chat && <Chat />}
        {/* Conditionally render the Notification component */}
        {isClicked.notification && <Notification />}
        {/* Conditionally render the UserProfile component */}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </nav>
  );
}
