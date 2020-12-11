import { FC, StrictMode } from 'react';

const App: FC = () => {
  console.log(
    'im process.env',
    process.env.CUSTOM,
    process.env.NODE_ENV,
    process.env.MAPBOX_GL_TOKEN
  );
  return (
    <StrictMode>
      <div>{process.env.MAPBOX_GL_TOKEN}</div>
    </StrictMode>
  );
};

export default App;
