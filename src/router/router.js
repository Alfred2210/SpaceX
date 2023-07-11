import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoMatch from './NoMatch';
import Quiz from "../pages/Quiz";
// import Navigation from '../layout/navigations';

const Routeur = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/quiz" element={<Quiz/>} />
          <Route path='*' element={<NoMatch/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routeur;
