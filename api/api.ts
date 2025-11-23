import facilities from '../assets/facilities.json';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type Facility = {
  id: string;
  name: string;
  address: string;
  facilities: string[];
  location: {
    latitude: number;
    longitude: number;
  };
};

export const fetchFacilities = async () => {
  await delay(400);
  return facilities;
};

export const fetchFacility = async (id: string) => {
  await delay(300);
  const facility = facilities.find((facility) => facility.id === id);

  if (!facility) {
    throw new Error('Facility not found');
  }

  return facility;
};