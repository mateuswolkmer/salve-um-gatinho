import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import type { Cat } from "../../tina/__generated__/types";
import type { TagProps } from "../components/Tag";

const today = new Date();

export const isCatNew = (cat: Cat) => {
  return cat.rescueDate && differenceInDays(today, cat.rescueDate) <= 30;
};

export const getCatGeneralTags = (cat: Cat) => {
  const tags: { label: string; tagProps?: Pick<TagProps, "color" | "icon"> }[] =
    [];

  if (isCatNew(cat)) {
    tags.push({
      label: "Novo",
      tagProps: { color: "yellow", icon: "star" },
    });
  }

  if (cat.gender === "female") {
    tags.push({
      label: "Fêmea",
      tagProps: { color: "pink", icon: "gender-female" },
    });
  }

  if (cat.gender === "male") {
    tags.push({
      label: "Macho",
      tagProps: { color: "blue", icon: "gender-male" },
    });
  }

  if (!cat.tested || cat.tested === "not-tested") {
    tags.push({
      label: "Não testado",
      tagProps: { color: "yellow" },
    });
  }

  if (cat.tested === "fiv" || cat.tested === "fiv-felv") {
    tags.push({
      label: "FIV+",
      tagProps: { color: "yellow", icon: "virus" },
    });
  }

  if (cat.tested === "felv" || cat.tested === "fiv-felv") {
    tags.push({
      label: "FeLV+",
      tagProps: { color: "yellow", icon: "virus" },
    });
  }

  cat.tags?.forEach((tag) => {
    tags.push({
      label: tag,
    });
  });

  return tags;
};

export const getCatAppearenceTags = (cat: Cat) => {
  const tags: { label: string; tagProps?: Pick<TagProps, "color" | "icon"> }[] =
    [];

  if (cat.birthDate) {
    const ageGroup = getCatAgeGroup(cat);

    if (ageGroup === "Filhote") {
      tags.push({
        label: "Filhote",
        tagProps: { color: "yellow", icon: "baby" },
      });
    } else if (ageGroup === "Jovem") {
      tags.push({
        label: "Jovem",
        tagProps: { color: "yellow" },
      });
    } else if (ageGroup === "Adulto") {
      tags.push({
        label: "Adulto",
        tagProps: { color: "yellow" },
      });
    } else if (ageGroup === "Idoso") {
      tags.push({
        label: "Idoso",
        tagProps: { color: "yellow", icon: "eyeglasses" },
      });
    }
  }

  if (cat.color) {
    tags.push({
      label: cat.color,
    });
  }

  return tags;
};

export const getCatStringTags = (cat: Cat) => {
  const tags: string[] = [];

  tags.push(...getCatAppearenceTags(cat).map((tag) => tag.label));
  tags.push(
    ...getCatGeneralTags(cat)
      .map((tag) => tag.label)
      .filter((tag) => tag !== "Novo")
  );

  if (tags.length > 5) {
    tags.splice(5);
    tags.push("…");
  }

  return tags.join(" • ");
};

export const AgeGroups = {
  Filhote: "Filhote",
  Jovem: "Jovem",
  Adulto: "Adulto",
  Idoso: "Idoso",
} as const;

export type AgeGroup = keyof typeof AgeGroups;

export const getCatAgeGroup = (cat: Cat): AgeGroup => {
  if (!cat.birthDate) return "Adulto";

  const monthsDifference = differenceInMonths(today, cat.birthDate);
  const yearDifference = differenceInYears(today, cat.birthDate);

  if (monthsDifference < 6) {
    return "Filhote";
  }
  if (yearDifference < 2) {
    return "Jovem";
  }
  if (yearDifference < 10) {
    return "Adulto";
  }
  return "Idoso";
};
