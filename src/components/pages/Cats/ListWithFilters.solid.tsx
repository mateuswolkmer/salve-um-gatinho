import { type Component, createEffect, createSignal } from "solid-js";
import type { Cat } from "../../../../tina/__generated__/types";
import {
  AgeGroups,
  getCatAgeGroup,
  getCatStringTags,
} from "../../../utils/catUtils";
import { CatCard } from "../../pages/Cat/CatCard.solid';
import { InputField } from "../../ui/InputField.solid";
import { SelectInput } from "../../ui/SelectInput.solid";

// query params
const GENERAL_QP = "filtro";
const AGE_QP = "idade";
const GENDER_QP = "genero";

export type ListWithFiltersProps = { cats?: Cat[] };

export const ListWithFilters: Component<ListWithFiltersProps> = ({
  cats = [],
}) => {
  const params = new URLSearchParams(window.location.search);

  const [filterTerm, setFilterTerm] = createSignal(
    params.get(GENERAL_QP) ?? ""
  );
  const [filterAge, setFilterAge] = createSignal(
    params.get(AGE_QP) ?? "qualquer"
  );
  const [filterGender, setFilterGender] = createSignal(
    params.get(GENDER_QP) ?? "qualquer"
  );

  // Update the URL query parameters whenever a filter changes
  createEffect(() => {
    const term = filterTerm();
    const age = filterAge();
    const gender = filterGender();

    const params = new URLSearchParams(window.location.search);

    if (term) {
      params.set(GENERAL_QP, term);
    } else {
      params.delete(GENERAL_QP);
    }

    if (age !== "qualquer") {
      params.set(AGE_QP, age);
    } else {
      params.delete(AGE_QP);
    }

    if (gender !== "qualquer") {
      params.set(GENDER_QP, gender);
    } else {
      params.delete(GENDER_QP);
    }

    const newSearch = params.toString();
    window.history.replaceState(
      null,
      "",
      window.location.pathname + (newSearch ? "?" + newSearch : "")
    );
  });

  const filteredCats = () =>
    cats.filter((cat) => {
      const sanitize = (s: string) =>
        s
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim();

      const filter = sanitize(filterTerm());
      const matchesNameOrTags =
        filter === "" ||
        sanitize(cat.name).includes(filter) ||
        sanitize(getCatStringTags(cat)).includes(filter);

      const ageGroup = getCatAgeGroup(cat);
      const matchesAge = filterAge() === "qualquer" || ageGroup === filterAge();

      const filteredGender =
        filterGender() === "macho"
          ? "male"
          : filterGender() === "femea"
          ? "female"
          : filterGender();

      const matchesGender =
        filterGender() === "qualquer" || cat.gender === filteredGender;

      return matchesNameOrTags && matchesAge && matchesGender;
    });

  return (
    <>
      <div class="flex flex-col gap-2 w-full max-w-5xl m-auto">
        <div class="mb-4 flex flex-col sm:flex-row gap-4">
          <InputField
            type="text"
            placeholder="Procure (nome, tag, fiv, felv)..."
            value={filterTerm()}
            onInput={(e) => setFilterTerm(e.currentTarget.value)}
            class="flex-1"
          />
          {/* FIXME initial value not showing on UI */}
          <SelectInput
            value={filterGender()}
            onChange={(e) => setFilterGender(e.currentTarget.value)}
          >
            <option value="qualquer">Qualquer gênero</option>
            <option value="macho" selected={filterGender() === "macho"}>
              Macho
            </option>
            <option value="femea" selected={filterGender() === "femea"}>
              Fêmea
            </option>
          </SelectInput>
          {/* FIXME initial value not showing on UI */}
          <SelectInput
            value={filterAge()}
            onChange={(e) => setFilterAge(e.currentTarget.value)}
          >
            <option value="qualquer">Qualquer idade</option>
            {Object.values(AgeGroups).map((ageGroup) => (
              <option value={ageGroup} selected={filterAge() === ageGroup}>
                {ageGroup}
              </option>
            ))}
          </SelectInput>
        </div>
      </div>
      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {filteredCats().map((cat) => (
          <CatCard cat={cat} />
        ))}
      </div>
    </>
  );
};
