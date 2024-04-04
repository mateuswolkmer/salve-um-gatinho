import client from "../../tina/__generated__/client";
import type { Testimony } from "../../tina/__generated__/types";

export const loadTestimoniesConnection = async () =>
  await client.queries.testimonyConnection();

export const getAllTestimonies = async (
  connection?: Awaited<ReturnType<typeof loadTestimoniesConnection>>
): Promise<Testimony[]> => {
  let testimoniesConnection = connection ?? (await loadTestimoniesConnection());

  const allTestimonies =
    testimoniesConnection.data.testimonyConnection.edges?.map((response) => ({
      ...(response?.node as Testimony),
    }));

  return allTestimonies;
};
