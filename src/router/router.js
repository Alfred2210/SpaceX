import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoMatch from './NoMatch';
// import Navigation from '../layout/navigations';



const Routeur = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<NoMatch />} />
          </Routes>
    </BrowserRouter>
  );
};

export default Routeur;
