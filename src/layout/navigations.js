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
      <div className="flex flex-col min-h-screen">
        <header className="bg-gray-100 dark:bg-gray-800 py-4">
          <nav className="container mx-auto">
            <ul className="flex justify-center space-x-6">
              <li>
                <a
                  href="http://localhost:3000/pokemon"
                  className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 font-medium"
                >
                  Pokemon List
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:3000/meteo"
                  className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 font-medium"
                >
                  Meteo
                </a>
              </li>
            </ul>
          </nav>
        </header>

        {children}

        <footer className="bg-gray-100 dark:bg-gray-800 py-4 flex-shrink-0">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; 2023 Merwan Laakad. Tous droits réservés.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Navigation;
