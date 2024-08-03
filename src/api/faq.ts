import client from "../../tina/__generated__/client";
import type { Faq, Partner } from "../../tina/__generated__/types";

export const loadFaqsConnection = async () =>
  await client.queries.faqConnection();

export const getAllFaqs = async (
  connection?: Awaited<ReturnType<typeof loadFaqsConnection>>
): Promise<Faq[]> => {
  let faqsConnection = connection ?? (await loadFaqsConnection());

  const allFaqs = faqsConnection.data.faqConnection.edges?.map((response) => ({
    ...(response?.node as Faq),
  }));

  return allFaqs;
};
