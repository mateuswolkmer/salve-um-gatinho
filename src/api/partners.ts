import client from "../../tina/__generated__/client";
import type { Partner } from "../../tina/__generated__/types";

export const loadPartnersConnection = async () =>
  await client.queries.partnerConnection();

export const getAllPartners = async (
  connection?: Awaited<ReturnType<typeof loadPartnersConnection>>
): Promise<Partner[]> => {
  let partnersConnection = connection ?? (await loadPartnersConnection());

  const allPartners = partnersConnection.data.partnerConnection.edges?.map(
    (response) => ({
      ...(response?.node as Partner),
    })
  );

  return allPartners;
};
