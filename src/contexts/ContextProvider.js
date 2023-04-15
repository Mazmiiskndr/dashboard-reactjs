import React, { createContext, useContext, useState } from "react";

// Create a context for storing and sharing application state
const StateContext = createContext();

// Define the initial state for various components
const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  // Declare state for screen size
  const [screenSize, setScreenSize] = useState(undefined);
  // Declare state for current color theme
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  // Declare state for current mode (Light or Dark)
  const [currentMode, setCurrentMode] = useState("Light");
  // Declare state for showing or hiding theme settings
  const [themeSettings, setThemeSettings] = useState(false);
  // Declare state for active menu (true or false)
  const [activeMenu, setActiveMenu] = useState(true);
  // Declare state for clicked item
  const [isClicked, setIsClicked] = useState(initialState);
  

  // Function to set the current mode
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  // Function to set the current color
  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  // Function to handle clicks on various components
  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  return (
    // Pass down state and state-updating functions as context values
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to easily access the state and state-updating functions from the context
export const useStateContext = () => useContext(StateContext);
