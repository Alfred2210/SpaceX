import React, { useState, useEffect } from 'react';
import SpaceXRoadster from './SpaceXRoadster';

const SpaceXAbout = () => {
  const [spaceXAbout, setSpaceXAbout] = useState([]);

  const getAboutFromSpaceX = async () => {
    const url = 'https://api.spacexdata.com/v4/company';
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSpaceXAbout(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAboutFromSpaceX();
  }, []);

  return (
    <>
      <section class="py-10 lg:py-0 about">
        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div class="grid items-stretch grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 xl:gap-x-24">
            <div class="flex items-center justify-start py-10 lg:order-1 sm:py-16 lg:py-24 xl:py-48">
              <div>
                <p class="text-sm font-semibold tracking-widest text-gray-500 uppercase">
                  Founded by {spaceXAbout.founder} in {spaceXAbout.founded},{' '}
                  {spaceXAbout.name} have more than {spaceXAbout.employees},
                  {spaceXAbout.vehicles} vehicules, {spaceXAbout.launch_sites}{' '}
                  launch sites and {spaceXAbout.test_sites} test sites
                </p>
                <h2 class="mt-8 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
                  {' '}
                  {spaceXAbout.name}
                </h2>
                <p class="text-xl leading-relaxed text-gray-200 mt-9">
                  {spaceXAbout.summary}.
                </p>
              </div>
              
            </div>
          </div>
          <SpaceXRoadster/>

        </div>
      </section>
    </>
  );
};

export default SpaceXAbout;
