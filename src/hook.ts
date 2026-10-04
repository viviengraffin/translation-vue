import { inject } from "vue";
import { PROVIDER_KEY } from "./const.ts";
import type { TranslationApi } from "./types.ts";

/**
 * Get the translation API
 * 
 * @example Simple translation
 * ```vue
 * <script setup>
 *  const { t } = useTranslation();
 * </script>
 * <template>
 *  <component :is="t("hello.world")" />
 * </template>
 * ```
 */
export function useTranslation(): TranslationApi {
  const api = inject<TranslationApi>(PROVIDER_KEY);

  if (!api) {
    throw new Error("Translation plugin is not installed");
  }

  return api;
}
