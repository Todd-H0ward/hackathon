import { useDisclosure } from '@mantine/hooks';
import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from 'react-leaflet';
import { useState } from 'react';
import styles from './AddNewsModal.module.scss';

const AddNewsModal = ({ className }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      title: '',
      dangerLevel: '',
      description: '',
      cords: null,
    },
  });
  const [selectedCoords, setSelectedCoords] = useState(null); // Для хранения выбранных координат

  const handleSubmit = async (data) => {
    console.log(data);
  };

  const MapEvents = ({ setCoords }) => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setCoords([lat, lng]);
      },
    });
    return null;
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Создать отчёт о происшествии"
        centered
        radius="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Название"
              placeholder="Введите название происшествия"
              {...form.getInputProps('title')}
            />
            <TextInput
              label="Описание"
              placeholder="Введите описание происшествия"
              {...form.getInputProps('description')}
            />

            <div className={styles.mapContainer}>
              <MapContainer center={[56.858745, 35.917421]} zoom={10}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapEvents
                  setCoords={(coords) => {
                    setSelectedCoords(coords);
                    form.setFieldValue('cords', coords); // Сохраняем координаты в форму
                  }}
                />
                {selectedCoords && (
                  <Marker position={selectedCoords}>
                    <Popup>Выбранные координаты</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>

            <Button type="submit" fullWidth mt="md">
              Отправить отчёт
            </Button>
          </Stack>
        </form>
      </Modal>

      <Button
        className={className}
        variant="filled"
        color="blue.7"
        onClick={open}
      >
        Сообщить о происшествии
      </Button>
    </>
  );
};

export default AddNewsModal;
