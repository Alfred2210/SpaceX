import React, { useState, useEffect } from 'react';

const SpaceXCrew = () => {
  const [spaceXHistory, setSpaceXHistory] = useState([]);

  const getHistoryFromSpaceX = async () => {
    const url = 'https://api.spacexdata.com/v4/history';
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSpaceXHistory(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHistoryFromSpaceX();
  }, []);

  return (
    <section className="history">
      <div className="timeline mx-auto max-w-3xl p-4">
        <ol className="border-l border-neutral-300 dark:border-neutral-500">
          {spaceXHistory.map((history, index) => (
            <li key={index}>
              <div className="flex-start flex items-center pt-3">
                <div className="-ml-5 mr-3 h-9 w-9 rounded-full bg-blue-600 dark:bg-blue-600" />
                <p className="text-sm text-black-400 dark:text-black-400">
                  {new Date(history.event_date_utc).toLocaleDateString(
                    'fr-FR',
                    {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    },
                  )}
                </p>
              </div>
              <div className="mb-6 ml-4 mt-2">
                <h4 className="mb-1.5 text-xl font-semibold">
                  {history.title}
                </h4>
                <p className="mb-3 text-black-500 dark:text-black-300">
                  {history.details}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
export default SpaceXCrew;
