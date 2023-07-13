import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SpaceXRocket = () => {
  const [spaceXRocket, setSpaceXRocket] = useState(null);
  const { id } = useParams();

  const getRocketFromSpaceX = async (rocketId) => {
    const url = `https://api.spacexdata.com/v4/rockets/${rocketId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSpaceXRocket(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRocketFromSpaceX(id);
  }, [id]);

  if (!spaceXRocket) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{spaceXRocket.name}</h1>
        <a
          className="text-blue-500 hover:underline"
          href={spaceXRocket.wikipedia}
          target="_blank"
          rel="noopener noreferrer"
        >
          Wikipedia
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Rocket Details</h2>
          <p>
            <span className="font-bold">Height:</span>{' '}
            {spaceXRocket.height.meters} meters ({spaceXRocket.height.feet}{' '}
            feet)
          </p>
          <p>
            <span className="font-bold">Diameter:</span>{' '}
            {spaceXRocket.diameter.meters} meters ({spaceXRocket.diameter.feet}{' '}
            feet)
          </p>
          <p>
            <span className="font-bold">Mass:</span> {spaceXRocket.mass.kg} kg (
            {spaceXRocket.mass.lb} lb)
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Extra Infos</h2>
          <p>
            <span className="font-bold">Country:</span> {spaceXRocket.country}
          </p>
          <p>
            <span className="font-bold">Company:</span> {spaceXRocket.company}
          </p>
          <p>
            <span className="font-bold">First Flight:</span>{' '}
            {spaceXRocket.first_flight}
          </p>
          <p>
            <span className="font-bold">Description:</span>{' '}
            {spaceXRocket.description}
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Additional Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {spaceXRocket.flickr_images.map((image, index) => (
            <img
              key={index}
              className="w-full h-full object-cover rounded-lg shadow-md"
              src={image}
              alt={`${spaceXRocket.name} Image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpaceXRocket;
