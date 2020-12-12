import { FC, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
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
      const map = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [mapState.lng, mapState.lat],
        zoom: mapState.zoom,
      });
      map.on('load', () => {
        map.resize();
      });
      setMap(map);
    }
  }, []);

  return (
    <div className="mapContainer">
      <div className="map" ref={mapRef} />
    </div>
  );
};

export default Map;
