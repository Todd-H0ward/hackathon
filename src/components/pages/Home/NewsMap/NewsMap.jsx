import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { Loader } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';
import PlaceMarker from '@/components/commons/PlaceMarker/PlaceMarker.jsx';
import IncidentMarker from '@/components/commons/IncidentMarket/IncidentMarker.jsx';
import CameraMarker from '@/components/commons/CameraMarker/CameraMarker.jsx';
import SensorMarker from '@/components/commons/SensorMarker';

import styles from './NewsMap.module.scss';

const LocationUpdater = ({ location }) => {
  const map = useMapEvents({
    locationfound: (e) => {
      map.setView(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    if (location && location.length === 2) {
      map.setView(location, map.getZoom());
    }
  }, [location, map]);

  return null;
};

const NewsMap = observer(() => {
  const { newsMap, incidents, camera, sensors } = useStore();

  useEffect(() => {
    newsMap.fetchPlaces();
    incidents.fetchIncidents();
    camera.fetchCameras();
    sensors.fetchSensors();
  }, []);

  const isLoading =
    newsMap.isLoading || incidents.isLoading || camera.isLoading;

  return (
    <>
      {isLoading ? (
        <div className={styles.loader}>
          <Loader size="lg" />
        </div>
      ) : (
        <MapContainer
          center={newsMap.location}
          zoom={7}
          className={styles.root}
          attributionControl={false}
        >
          <LocationUpdater location={newsMap.location} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {newsMap.places.map((place) => (
            <PlaceMarker key={`place-${place.id}`} place={place} />
          ))}

          {incidents.incidents.map((incident) => (
            <IncidentMarker
              key={`incident-${incident.id}`}
              incident={incident}
            />
          ))}

          {camera.cameras.map((camera) => (
            <CameraMarker key={`camera-${camera.id}`} camera={camera} />
          ))}

          {sensors.sensors.map((sensor) => (
            <SensorMarker key={`sensor-${sensor.id}`} sensor={sensor} />
          ))}
        </MapContainer>
      )}
    </>
  );
});

export default NewsMap;
