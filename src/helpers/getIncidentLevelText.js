export const getIncidentLevelText = (level) => {
  switch (level) {
    case 'HIGH':
      return 'Высокий';
    case 'MEDIUM':
      return 'Средний';
    case 'LOW':
      return 'Низкий';
    default:
      return level;
  }
};