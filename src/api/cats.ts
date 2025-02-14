import client from "../../tina/__generated__/client";
import type { Cat } from "../../tina/__generated__/types";
import { compareDesc } from "date-fns";
import { isCatNew } from "../utils/catUtils";

export const loadCatConnection = async () =>
  await client.queries.catConnection();

export const getAllCats = async (
  connection?: Awaited<ReturnType<typeof loadCatConnection>>,
  {
    sort = true,
    filterAdopted = true,
  }: { sort?: boolean; filterAdopted?: boolean } = {}
): Promise<Cat[]> => {
  const catConnection = connection ?? (await loadCatConnection());

  let cats = (catConnection.data.catConnection.edges ?? []).map((response) => ({
    ...(response?.node as Cat),
  }));

  if (filterAdopted) {
    cats = cats.filter((cat) => !cat.adopted);
  }

  if (sort) {
    cats.sort((a, b) => compareDesc(a.rescueDate, b.rescueDate));
  }

  return cats;
};

const AMOUNT_OF_NEW_CATS = 2;

export const getNewCats = async (
  connection?: Awaited<ReturnType<typeof loadCatConnection>>
): Promise<Cat[]> => {
  const allCats = await getAllCats(connection);

  const newCats = allCats.filter(isCatNew);
  return newCats.length < AMOUNT_OF_NEW_CATS
    ? [...allCats]
    : [...newCats].sort(() => 0.5 - Math.random()).slice(0, AMOUNT_OF_NEW_CATS);
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
  const allCats = await getAllCats(connection, {
    sort: false,
  });
  const shuffledCats = [...allCats].sort(() => 0.5 - Math.random());
  return shuffledCats.slice(0, AMOUNT_OF_RANDOM_CATS);
};
