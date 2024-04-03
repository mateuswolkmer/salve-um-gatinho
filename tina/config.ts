import { Form, defineConfig } from "tinacms";
import { hidden, slugFromName } from "./utils";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "cat",
        label: "Gatos",
        path: "content/cats",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return slugFromName(values.name);
            },
          },
          beforeSubmit: async ({
            form,
            values,
          }: {
            form: Form;
            values: Record<string, any>;
          }) => {
            const now = new Date().toISOString();

            let finalValues: Record<string, any> = {
              ...values,
              slug: slugFromName(values.name),
              updatedDate: now,
            };

            if (form.crudType === "create") {
              finalValues["createdDate"] = now;
            }

            return finalValues;
          },
        },
        fields: [
          // Meta (hidden)
          {
            name: "slug",
            type: "string",
            ui: hidden,
          },
          {
            name: "createdDate",
            type: "datetime",
            ui: hidden,
          },
          {
            name: "updatedDate",
            type: "datetime",
            ui: hidden,
          },
          // Basic
          {
            name: "name",
            label: "Nome",
            type: "string",
            isTitle: true,
            required: true,
            searchable: true,
          },
          {
            name: "adopted",
            label: "Adotado",
            type: "boolean",
          },
          {
            name: "patronized",
            label: "Apadrinhado",
            type: "boolean",
          },
          {
            name: "description",
            label: "Descrição",
            type: "string",
            isBody: true,
          },
          {
            name: "tags",
            label: "Tags",
            description: "Tags adicionais (exemplo: Especial, Cego, ",
            type: "string",
            list: true,
            options: ["Especial", "Cego"],
            ui: {
              component: "tags",
            },
          },
          {
            name: "gender",
            label: "Gênero",
            type: "string",
            options: [
              {
                value: "male",
                label: "Macho",
              },
              {
                value: "female",
                label: "Fêmea",
              },
            ],
          },
          {
            name: "birthDate",
            label: "Data de nascimento",
            type: "datetime",
          },
          {
            name: "rescueDate",
            label: "Data de resgate",
            description:
              "Usar o mesmo do nascimento quando foi nascido no abrigo",
            type: "datetime",
          },
          // Status
          {
            name: "neutered",
            label: "Castrado",
            type: "boolean",
          },
          {
            name: "vaccinated",
            label: "Vacinado",
            type: "boolean",
          },
          // Personality
          {
            name: "social",
            label: "Sociável",
            description: "O quão sociável é o gato (1 a 5)",
            type: "string",
            options: ["1", "2", "3", "4", "5"],
            ui: {
              component: "radio-group",
              // @ts-ignore
              direction: "horizontal",
            },
          },
          {
            name: "plauful",
            label: "Brincalhão",
            description: "O quão brincalhão é o gato (1 a 5)",
            type: "string",
            options: ["1", "2", "3", "4", "5"],
            ui: {
              component: "radio-group",
              // @ts-ignore
              direction: "horizontal",
            },
          },
          {
            name: "loving",
            label: "Carinhoso",
            description: "O quão carinhoso é o gato (1 a 5)",
            type: "string",
            options: ["1", "2", "3", "4", "5"],
            ui: {
              component: "radio-group",
              // @ts-ignore
              direction: "horizontal",
            },
          },
        ],
      },
    ],
  },
});
