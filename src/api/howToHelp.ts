import client from "../../tina/__generated__/client";
import type { HowToHelp } from "../../tina/__generated__/types";

export const loadHowToHelpConnection = async () =>
  await client.queries.howToHelpConnection();

export const getAllHowToHelp = async (
  connection?: Awaited<ReturnType<typeof loadHowToHelpConnection>>
): Promise<HowToHelp[]> => {
  const howToHelpConnection = connection ?? (await loadHowToHelpConnection());

  const allHowToHelp =
    howToHelpConnection.data.howToHelpConnection.edges?.map((response) => ({
      ...(response?.node as HowToHelp),
    })) || [];

  return allHowToHelp;
};
