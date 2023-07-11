import React, { useState } from 'react';

const Navigation = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  const setLayoutLightMode = () => {
    document.body.classList.remove('dark');
  };

  const setLayoutDarkMode = () => {
    document.body.classList.add('dark');
  };

  const showMode = (darkMode) => {
    if (darkMode) {
      setLayoutDarkMode();
    } else {
      setLayoutLightMode();
    }
  };

  return (
    <>

    </>
  );
};

export default Navigation;
