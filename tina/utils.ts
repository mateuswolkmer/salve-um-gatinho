export const slugFromName = (name: string) => {
  if (!name || typeof name !== "string") {
    return "";
  }

  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "");
};

export const hidden = {
  component: () => false,
};
