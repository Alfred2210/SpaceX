import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoMatch from './NoMatch';
import SpaceXMember from '../pages/SpaceXMember';
import SpaceXHistoryList from '../pages/SpaceXHistory';
import SpaceXAboutPage from '../pages/SpaceXAbout';
import Navigation from '../layout/navigations';
import SpaceXRocketsPage from '../pages/SpaceXRockets';
import SpaceXRocketPage from '../pages/SpaceXRocket';
import SpaceXMainPage from '../pages/SpaceXMain';

const Routeur = () => {
  return (
    <BrowserRouter>
      <Navigation>
        <Routes>
          <Route
            path="/space-x-lastest-launch"
            element={<SpaceXMainPage />}
          ></Route>
          <Route path="/" element={<SpaceXAboutPage />}></Route>
          <Route path="*" element={<NoMatch />} />
          <Route path="/space-x-member" element={<SpaceXMember />} />
          <Route
            path="/space-x-launches-history"
            element={<SpaceXHistoryList />}
          />
          <Route path="/space-x-rockets" element={<SpaceXRocketsPage />} />
          <Route path="/space-x-rockets/:id" element={<SpaceXRocketPage />} />
        </Routes>
      </Navigation>
    </BrowserRouter>
  );
};

export default Routeur;
