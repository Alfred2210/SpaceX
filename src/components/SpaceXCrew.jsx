import React, { useState, useEffect } from 'react';

const SpaceXCrew = () => {
  const [spaceXCrew, setSpaceXCrew] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [noMemberFound, setNoMemberFound] = useState(false);

  const getCrewFromSpaceX = async () => {
    const url = 'https://api.spacexdata.com/v4/crew';
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSpaceXCrew(data);
      setNoMemberFound(data.length === 0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCrewFromSpaceX();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedMember(null);
  };

  const filteredCrew = spaceXCrew.filter(
    (member) =>
      member.name.toLowerCase().includes(filter.toLowerCase()) ||
      member.agency.toLowerCase().includes(filter.toLowerCase()),
  );

  const openPopup = (member) => {
    setSelectedMember(member);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Filter"
          value={filter}
          onChange={handleFilterChange}
          className="w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 p-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {filteredCrew.length === 0 || noMemberFound ? (
          <p>Aucun membre n'a été trouvé.</p>
        ) : (
          filteredCrew.map((member, index) => (
            <div
              className="bg-gray-20 flex justify-center items-center h-fit card"
              key={index}
              onClick={() => openPopup(member)}
            >
              <div className="max-w-xs container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                <div>
                  <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100">
                    {member.name}
                  </h1>
                  <p className="ml-4 mt-1 mb-2 text-gray-700 cursor-pointer"></p>
                </div>
                <img
                  className="w-full cursor-pointer"
                  src={member.image}
                  alt={member.name}
                />
              </div>
            </div>
          ))
        )}
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
          <div className="max-w-md p-4 bg-white rounded-xl">
            <h2 className="text-xl font-bold mb-2">{selectedMember.name}</h2>

            {selectedMember.status === 'active' ? (
              <span class="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="-ms-1 me-1.5 h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p class="whitespace-nowrap text-sm">{selectedMember.status}</p>
              </span>
            ) : (
              <span class="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="-ms-1 me-1.5 h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>

                <p class="whitespace-nowrap text-sm">{selectedMember.status}</p>
              </span>
            )}

            <p>{selectedMember.agency}</p>
            <img
              className="w-full mt-2"
              src={selectedMember.image}
              alt={selectedMember.name}
              style={{ maxHeight: '400px' }}
            />
            <div className="flex p-4 justify-between">
              <div className="flex items-center space-x-2">
                <a
                  className="text-gray-800 font-bold hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer"
                  href={selectedMember.wikipedia}
                >
                  Wikipedia
                </a>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="text-gray-800 font-bold hover:border-opacity-100 hover:text-red-500 duration-200 cursor-pointer"
                onClick={closePopup}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SpaceXCrew;
