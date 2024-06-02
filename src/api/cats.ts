import client from "../../tina/__generated__/client";
import type { Cat } from "../../tina/__generated__/types";

export const loadCatConnection = async () =>
  await client.queries.catConnection();

export const getAllCats = async (
  connection?: Awaited<ReturnType<typeof loadCatConnection>>
): Promise<Cat[]> => {
  let catConnection = connection ?? (await loadCatConnection());

  const allCats = catConnection.data.catConnection.edges?.map((response) => ({
    ...(response?.node as Cat),
  }));

  return allCats;
};

const AMOUNT_OF_NEW_CATS = 2;

export const getNewCats = async (
  connection?: Awaited<ReturnType<typeof loadCatConnection>>
): Promise<Cat[]> => {
  const allCats = await getAllCats(connection);

  return [...allCats].splice(0, AMOUNT_OF_NEW_CATS);
};

// just the ones that are not new
export const getOldCats = async (
  connection?: Awaited<ReturnType<typeof loadCatConnection>>
): Promise<Cat[]> => {
  const allCats = await getAllCats(connection);

  return [...allCats].splice(AMOUNT_OF_NEW_CATS, allCats.length);
};

const AMOUNT_OF_RANDOM_CATS = 5;

export const getRandomCats = async (
  connection?: Awaited<ReturnType<typeof loadCatConnection>>
): Promise<Cat[]> => {
  const allCats = await getAllCats(connection);

  const shuffledCats = [...allCats].sort(() => 0.5 - Math.random());
  return shuffledCats.slice(0, AMOUNT_OF_RANDOM_CATS);
};
