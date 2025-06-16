import { Form, defineConfig } from "tinacms";
import { hidden, slugFromName } from "./utils";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "master";

export default defineConfig({
  branch,
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "src/assets",
      publicFolder: "",
    },
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ["eng", "porBr"],
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
            name: "passed",
            label: "Partiu",
            type: "boolean",
          },
          {
            name: "condition",
            label: "Condição especial",
            type: "string",
            description: "Deixe vazio caso apto",
            options: [
              {
                value: "em socialização",
                label: "Em socialização",
              },
              {
                value: "em tratamento",
                label: "Em tratamento",
              },
              {
                value: "amamentando",
                label: "Amamentando",
              },
              {
                value: "mamando",
                label: "Mamando",
              },
              {
                value: "grávida",
                label: "Grávida",
              },
            ],
          },
          {
            name: "image",
            label: "Foto",
            type: "image",
          },
          {
            name: "description",
            label: "Descrição",
            type: "string",
            isBody: true,
            ui: {
              component: "textarea",
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
            name: "color",
            label: "Pelagem",
            type: "string",
            options: [
              "Preto",
              "Branco",
              "Cinza",
              "Laranja",
              "Sialata",
              "Tricolor",
              "Tigrado",
              "Frajola",
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
          {
            name: "tags",
            label: "Tags",
            description:
              "Observações adicionais (exemplo: Especial, Cego, Esporotricose...)",
            type: "string",
            list: true,
            ui: {
              component: "tags",
            },
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
          {
            name: "tested",
            label: "Testado para FIV/FeLV",
            type: "string",
            options: [
              { value: "not-tested", label: "Não testado" },
              { value: "negative", label: "Testado e negativo" },
              { value: "fiv", label: "FIV+" },
              { value: "felv", label: "FeLV+" },
              { value: "fiv-felv", label: "FIV+ e FeLV+" },
            ],
          },
          // Personality
          {
            name: "coliving",
            label: "Boa convivência com outros gatos?",
            type: "boolean",
          },
          {
            name: "social",
            label: "Sociável",
            description: "O quão sociável é o gato (1 a 3)",
            type: "string",
            options: ["1", "2", "3"],
            ui: {
              component: "radio-group",
              // @ts-ignore
              direction: "horizontal",
            },
          },
          {
            name: "playful",
            label: "Brincalhão",
            description: "O quão brincalhão é o gato (1 a 3)",
            type: "string",
            options: ["1", "2", "3"],
            ui: {
              component: "radio-group",
              // @ts-ignore
              direction: "horizontal",
            },
          },
          {
            name: "loving",
            label: "Carinhoso",
            description: "O quão carinhoso é o gato (1 a 3)",
            type: "string",
            options: ["1", "2", "3"],
            ui: {
              component: "radio-group",
              // @ts-ignore
              direction: "horizontal",
            },
          },
        ],
      },
      {
        name: "testimony",
        label: "Depoimentos",
        path: "content/testimonies",
        ui: {
          filename: {
            slugify: (values) => {
              return slugFromName(values.personName);
            },
          },
        },
        fields: [
          {
            name: "personName",
            label: "Nome do adotante",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "personImage",
            label: "Foto do adotante",
            type: "image",
            required: true,
          },
          {
            name: "cat",
            label: "Gato adotado",
            type: "reference",
            collections: ["cat"],
          },
          {
            name: "plus",
            label: "Quantos gatos a mais esta pessoa adotou",
            type: "number",
          },
          {
            name: "message",
            label: "Mensagem",
            type: "string",
            required: true,
            ui: {
              component: "textarea",
            },
          },
        ],
      },
      {
        name: "partner",
        label: "Parceiros",
        path: "content/partners",
        ui: {
          filename: {
            slugify: (values) => {
              return slugFromName(values.name);
            },
          },
        },
        fields: [
          {
            name: "name",
            label: "Nome",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "image",
            label: "Logo",
            type: "image",
            required: true,
          },
        ],
      },
      {
        name: "faq",
        label: "FAQ",
        path: "content/faq",
        ui: {
          filename: {
            slugify: (values) => {
              return slugFromName(values.question);
            },
          },
        },
        fields: [
          {
            name: "question",
            label: "Pergunta",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "important",
            label: "Importante",
            description: "Aparecerá antes das outras perguntas",
            type: "boolean",
          },
          {
            name: "answer",
            label: "Resposta",
            type: "rich-text",
            required: true,
          },
        ],
      },
      {
        name: "howToHelp",
        label: "Formas de Ajudar",
        path: "content/howToHelp",
        ui: {
          filename: {
            slugify: (values) => {
              return slugFromName(values.title);
            },
          },
        },
        fields: [
          {
            name: "title",
            label: "Título",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "content",
            label: "Texto",
            type: "rich-text",
            required: true,
            isBody: true,
          },
          {
            name: "image",
            label: "Imagem",
            type: "image",
          },
          {
            name: "noBorderImage",
            label: "Imagem sem bordas",
            description: "Não adiciona bordas na imagem",
            type: "boolean",
          },
        ],
      },
    ],
  },
});
