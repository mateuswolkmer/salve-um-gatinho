import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from "date-fns";
import type { Cat } from "../../tina/__generated__/types";
import type { TagProps } from "../components/Tag";

const today = new Date();

export const getCatGeneralTags = (cat: Cat) => {
  const tags: { label: string; tagProps?: Pick<TagProps, "color" | "icon"> }[] =
    [];

  if (cat.rescueDate && differenceInDays(today, cat.rescueDate) <= 30) {
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

  if (cat.birthDate && differenceInMonths(today, cat.birthDate) <= 6) {
    tags.push({
      label: "Filhote",
      tagProps: { color: "yellow", icon: "baby" },
    });
  }

  if (cat.birthDate && differenceInYears(today, cat.birthDate) >= 10) {
    tags.push({
      label: "Idoso",
      tagProps: { color: "yellow", icon: "eyeglasses" },
    });
  }

  if (cat.fiv) {
    tags.push({
      label: "FIV+",
      tagProps: { color: "yellow", icon: "virus" },
    });
  }

  if (cat.felv) {
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

  // if (cat.felv) {
  //   tags.push({
  //     label: "FeLV+",
  //     tagProps: { color: "yellow", icon: "virus" },
  //   });
  // }

  return tags;
};
