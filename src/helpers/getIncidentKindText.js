export const getIncidentKindText = (kind) => {
  switch (kind) {
    case 'CHEMICAL':
      return 'Химическая угроза';
    case 'RADIATION_BURST':
      return 'Радиационная угроза';
    case 'FIRE':
      return 'Пожар';
    case 'FLOOD':
      return 'Наводнение';
    default:
      return kind;
  }
};