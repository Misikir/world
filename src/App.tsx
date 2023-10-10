import './App.css';

import { Suspense, lazy } from 'react';
import { ErrorBoundary } from './utilities/error-boundary';

const Mapbox = lazy(() => import('./components/mapbox/mapbox'));
function App() {
  return (
    <div role="map">
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Mapbox />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
