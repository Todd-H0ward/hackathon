import { Select } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { REGIONS } from '@/stubs/regions.js';
import { useStore } from '@/hooks/useStore.js';

const RegionDropdown = observer(() => {
  const newsStore = useStore().news;

  const handleRegionChange = (value) => {
    newsStore.setRegion(value);
    newsStore.fetchNews();
  };

  return (
    <Select
      label="Выберите регион"
      value={newsStore.region}
      onChange={handleRegionChange}
      data={REGIONS.map((region) => ({
        value: region.code,
        label: region.name,
      }))}
      placeholder="Выберите регион"
      required
    />
  );
});

export default RegionDropdown;
