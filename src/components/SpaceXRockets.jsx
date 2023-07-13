import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SpaceXRockets = () => {
  const [spaceXRockets, setSpaceXRockets] = useState([]);
  const [selectedRocket, setSelectedRocket] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const getRocketsFromSpaceX = async () => {
    const url = 'https://api.spacexdata.com/v4/rockets';
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSpaceXRockets(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRocketsFromSpaceX();
  }, []);

  return (
    <div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 p-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-2">
        {spaceXRockets.map((rocket, index) => (
          <Link to={`/space-x-rockets/${rocket.id}`} key={index}>
            <div
              className="bg-gray-20 flex justify-center items-center h-fit card"
              key={index}
            >
              <div className="max-w-xs container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                <div>
                  <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100">
                    {rocket.name}
                  </h1>
                  <p className="ml-4 mt-1 mb-2 text-gray-700 cursor-pointer"></p>
                </div>
                <div className="relative">
                  <img
                    className="w-full cursor-pointer"
                    src={rocket.flickr_images[0]}
                    alt={rocket.name}
                  />
                  {rocket.flickr_images.length > 1 && (
                    <div className="absolute bottom-0 left-0 w-full flex justify-center items-center bg-black bg-opacity-50">
                      <p className="text-white font-bold">{`+${
                        rocket.flickr_images.length - 1
                      }`}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpaceXRockets;
