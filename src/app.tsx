import { FC, StrictMode } from 'react';

const App: FC = () => (
  <StrictMode>
    <div>{process.env.MAPBOX_GL_TOKEN}</div>
  </StrictMode>
);

export default App;
