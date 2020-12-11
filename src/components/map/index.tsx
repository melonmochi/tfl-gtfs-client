import mapboxgl from 'mapbox-gl';
import { FC, useEffect, useRef, useState } from 'react';
import './index.less';

mapboxgl.accessToken = process.env.MAPBOX_GL_TOKEN || 'MAPBOX_ACCESS_TOKEN';

const Map: FC = () => {
  const [, setMap] = useState<mapboxgl.Map | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapState = {
    lng: 5,
    lat: 34,
    zoom: 2,
  };

  useEffect(() => {
    if (mapRef && mapRef.current) {
      setMap(
        new mapboxgl.Map({
          container: mapRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [mapState.lng, mapState.lat],
          zoom: mapState.zoom,
        })
      );
    }
  }, []);

  return (
    <div>
      <div className="mapContainer" ref={mapRef} />
    </div>
  );
};

export default Map;
