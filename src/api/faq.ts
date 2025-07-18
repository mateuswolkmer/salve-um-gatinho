import client from "../../tina/__generated__/client";
import type { Faq } from "../../tina/__generated__/types";

export const loadFaqsConnection = async () =>
  await client.queries.faqConnection();

export const getAllFaqs = async (
  connection?: Awaited<ReturnType<typeof loadFaqsConnection>>
): Promise<Faq[]> => {
  const faqsConnection = connection ?? (await loadFaqsConnection());

  const allFaqs = faqsConnection.data.faqConnection.edges?.map((response) => ({
    ...(response?.node as Faq),
  }));

  return allFaqs;
};

export const getCategorizedFaqs = async (
  connection?: Awaited<ReturnType<typeof loadFaqsConnection>>
): Promise<{ important: Faq[]; other: Faq[] }> => {
  const allFaqs = await getAllFaqs(connection);

  return allFaqs.reduce(
    (acc, cur) => {
      acc[cur.important ? "important" : "other"].push(cur);
      return acc;
    },
    { important: [], other: [] }
  );
};
