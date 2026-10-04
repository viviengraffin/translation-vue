import type { TestTranslationsType } from "./type.ts";
import { h } from "vue";

export default {
  hello: {
    world: h("h1", "Salut le monde"),
  },
} satisfies TestTranslationsType;
