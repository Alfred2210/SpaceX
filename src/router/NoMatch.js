import { Link, useLocation } from 'react-router-dom';

import React from 'react';
import NotFound404 from '../pages/404';

  return (
    <center>
      <h2>404</h2>
      <code>Page : {location.pathname}</code>
      <br />

      <Link to="/" className="btn btn-primary">
        Retour sur la page princpale !
      </Link>
    </center>
  );
}
