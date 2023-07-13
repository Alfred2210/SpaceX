import React, { useState, useEffect } from 'react';

const Home = () => {
  const [latestLaunch, setLatestLaunch] = useState(null);
  const [crewDetails, setCrewDetails] = useState([]);
  const [capsuleDetails, setCapsuleDetails] = useState(null);
  const [payloadDetails, setPayloadDetails] = useState(null);
  const [launchpadDetails, setLaunchpadDetails] = useState(null);

  const getLatestLaunch = async () => {
    const url = 'https://api.spacexdata.com/v5/launches/latest';
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLatestLaunch(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCrewDetails = async (id, role) => {
    const url = `https://api.spacexdata.com/v4/crew/${id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCrewDetails((prevState) => [...prevState, { ...data, role }]);
    } catch (error) {
      console.error(error);
    }
  };

  const getCapsuleDetails = async (id) => {
    const url = `https://api.spacexdata.com/v4/capsules/${id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCapsuleDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getPayloadDetails = async (id) => {
    const url = `https://api.spacexdata.com/v4/payloads/${id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPayloadDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getLaunchpadDetails = async (id) => {
    const url = `https://api.spacexdata.com/v4/launchpads/${id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLaunchpadDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLatestLaunch();
  }, []);

  useEffect(() => {
    if (latestLaunch) {
      latestLaunch.crew.forEach((crewMember) => {
        if (!crewDetails.some((crew) => crew.id === crewMember.crew)) {
          getCrewDetails(crewMember.crew, crewMember.role);
        }
      });

      latestLaunch.capsules.forEach((capsuleId) => {
        getCapsuleDetails(capsuleId);
      });

      latestLaunch.payloads.forEach((payload) => {
        getPayloadDetails(payload);
      });

      getLaunchpadDetails(latestLaunch.launchpad);
    }
  }, [latestLaunch]);

  return (
    <div>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Latest SpaceX Launch
        </h1>
        {latestLaunch ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`bg-white shadow-md rounded-lg p-4 mt-3 ${
                latestLaunch.success ? 'border-green-500' : 'border-red-500'
              }`}
            >
              <h2 className="text-2xl font-bold mb-2">Launch Information</h2>
              <p className="mb-2">
                Mission Name:{' '}
                <span className="font-bold">{latestLaunch.name}</span>
              </p>
              <p className="mb-2">
                Launch Date:{' '}
                <span className="font-bold">
                  {new Date(latestLaunch.date_utc).toLocaleDateString('en-US', {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </span>
              </p>
              <p className="mb-2">
                Launch Success:{' '}
                <span
                  className={`font-bold ${
                    latestLaunch.success ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {latestLaunch.success ? 'Successful' : 'Failed'}
                </span>
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-1 mt-3">
              <h2 className="text-2xl font-bold mb-2">Crew</h2>
              {crewDetails.length > 0 ? (
                crewDetails.map((crewMember) => (
                  <div
                    key={crewMember.id}
                    className="bg-white rounded-lg p-2 flex items-center mb-2"
                  >
                    <img
                      className="w-12 h-12 rounded-full mr-4"
                      src={crewMember.image}
                      alt={crewMember.name}
                    />
                    <div>
                      <p className="font-bold">{crewMember.name}</p>
                      <p>{crewMember.role}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No crew assigned to this launch.</p>
              )}
            </div>
          </div>
        ) : (
          <p>Loading data...</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {launchpadDetails && (
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-2xl font-bold mb-2">Launchpad Details</h2>
              <p>Name: {launchpadDetails.name}</p>
              <p>Location: {launchpadDetails.locality}</p>
              <p>Region: {launchpadDetails.region}</p>
              <p>Launch Attempts: {launchpadDetails.launch_attempts}</p>
              <p>Launch Successes: {launchpadDetails.launch_successes}</p>
            </div>
          )}

          {capsuleDetails && (
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-2xl font-bold mb-2">Capsule Details</h2>
              <p>Reuse Count: {capsuleDetails.reuse_count}</p>
              <p>Status: {capsuleDetails.status}</p>
            </div>
          )}

          {payloadDetails && (
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-2xl font-bold mb-2">Payload Details</h2>
              <p>Name: {payloadDetails.name}</p>
              <p>Type: {payloadDetails.type}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
