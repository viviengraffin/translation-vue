import type { TranslationObjectByLocale } from "@viviengraffin/translation-core";
import type { VueTranslation } from "@/types.ts";

export default {
  fr: async () => (await import("./fr.ts")).default,
  en: async () => (await import("./en.ts")).default,
} satisfies TranslationObjectByLocale<VueTranslation>;
