import './App.css';

import { lazy } from 'react';

const Mapbox = lazy(() => import('./components/mapbox/mapbox'));
function App() {
  return (
    <>
      <Mapbox />
    </>
  );
}

export default App;
