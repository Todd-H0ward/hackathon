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

const LocationUpdater = ({ location, zoom }) => {
  const map = useMapEvents({});

  useEffect(() => {
    if (location && location.length === 2) {
      map.setView(location, zoom);
    }
  }, [location, zoom, map]);

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
          zoom={newsMap.zoom}
          className={styles.root}
          attributionControl={false}
        >
          <LocationUpdater location={newsMap.location} zoom={newsMap.zoom} />
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
