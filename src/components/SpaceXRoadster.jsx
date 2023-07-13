import React, { useEffect, useRef, useState } from 'react';

const SpaceXRoadster = () => {
  const [roadsterData, setRoadsterData] = useState([]);

  const getRoadsterPosition = async () => {
    const url = `https://api.spacexdata.com/v4/roadster`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setRoadsterData([data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRoadsterPosition();
  }, []);

  return (
    <div className="flex justify-left items-end ">
      {roadsterData.length > 0 && (
        <div className="">
          <h2 className="text-2xl font-bold mb-4 text-white">
            {roadsterData[0].name}
          </h2>
          <p className="text-white">
            Launch Date: {roadsterData[0].launch_date_utc}
          </p>
          <p className="text-white">
            Launch Mass: {roadsterData[0].launch_mass_kg} kg
          </p>
          <p className="text-white">Orbit Type: {roadsterData[0].orbit_type}</p>
          <p className="text-white">
            Earth Distance: {roadsterData[0].earth_distance_km} km
          </p>
        </div>
      )}
    </div>
  );
};
export default SpaceXRoadster;
