import { compareDesc } from "date-fns";
import client from "../../tina/__generated__/client";
import type { Cat } from "../../tina/__generated__/types";
import { isCatNew } from "../utils/catUtils";

export const loadCatConnection = async () => {
  try {
    const connection = await client.queries.catConnection({
      first: 1000,
    });
    return connection;
  } catch (error) {
    console.error("Error loading cat connection:", error);
    throw error;
  }
};

export const filterUnavailableCats = (cats: Cat[]) => {
  return cats.filter((cat) => !cat.adopted && !cat.passed);
};

export const getAllCats = async (
  connection?: Awaited<ReturnType<typeof loadCatConnection>>,
  {
    sort = true,
    /** Unavailable = adopted or passed */
    filterUnavailable = true,
  }: { sort?: boolean; filterUnavailable?: boolean } = {}
): Promise<Cat[]> => {
  try {
    const catConnection = connection ?? (await loadCatConnection());

    let cats = (catConnection.data.catConnection.edges ?? [])
      .map((response) => {
        if (!response?.node) {
          return null;
        }
        return {
          ...(response.node as Cat),
        };
      })
      .filter(Boolean) as Cat[];

    if (filterUnavailable) {
      cats = filterUnavailableCats(cats);
    }

    if (sort) {
      cats.sort((a, b) => compareDesc(a.rescueDate, b.rescueDate));
    }

    return cats;
  } catch (error) {
    console.error("Error in getAllCats:", error);
    throw error;
  }
};

const AMOUNT_OF_NEW_CATS = 2;

export const getNewCats = async (
  connection?: Awaited<ReturnType<typeof loadCatConnection>>
): Promise<Cat[]> => {
  const allCats = await getAllCats(connection);

  const newCats = allCats.filter(isCatNew);

  const cats =
    newCats.length <= AMOUNT_OF_NEW_CATS
      ? [...newCats]
      : [...newCats]
          .sort(() => 0.5 - Math.random())
          .slice(0, AMOUNT_OF_NEW_CATS);

  // failsafe
  let iterations = 0;
  while (cats.length < AMOUNT_OF_NEW_CATS) {
    const randomCat = allCats[Math.floor(Math.random() * allCats.length)];
    if (!cats.includes(randomCat)) {
      cats.push(randomCat);
    }

    iterations++;
    if (iterations > 20) {
      break;
    }
  }

  return cats;
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
