import { v4 as uuidv4 } from "uuid";

export const generateUUIDs = (count: number): string[] => {
  const uuids: string[] = [];
  for (let i = 0; i < count; i++) {
    uuids.push(uuidv4());
  }
  return uuids;
};
