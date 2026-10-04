import {
  DEFAULT_FALLBACK_LOCALE,
  DEFAULT_LOCALE_FORMAT,
  DEFAULT_SEPARATOR,
  TranslationBuilder,
  TranslationNamespaces,
} from "@viviengraffin/translation-core";
import { type App, computed, ref } from "vue";
import { TranslationVue } from "./class.ts";
import { Environment } from "@viviengraffin/translation-core/frontend";
import { PROVIDER_KEY } from "./const.ts";
import type {
  CreateTranslationVuePluginReturns,
  TranslationVuePluginOptions,
} from "./types.ts";

/**
 * Create translation-vue plugin
 * 
 * @param options - Options of plugin 
 */
export const createTranslationVuePlugin = async (
  {
    translations,
    locale: initLocale,
    fallbackLocale = DEFAULT_FALLBACK_LOCALE,
    localeFormat = DEFAULT_LOCALE_FORMAT,
    environment = Environment,
    separator = DEFAULT_SEPARATOR,
    onLocaleChange = () => {},
  }: TranslationVuePluginOptions,
): CreateTranslationVuePluginReturns => {
  const locale = ref(
    typeof initLocale === "function" ? await initLocale() : initLocale,
  );

  const namespacesRef = ref(
    translations instanceof TranslationNamespaces
      ? translations.getNamespaces()
      : [],
  );

  const builder = new TranslationBuilder(TranslationVue)
    .withEnvironment(environment)
    .withLocale(locale.value)
    .withSeparator(separator)
    .withFallbackLocale(fallbackLocale)
    .withLocaleFormat(localeFormat)
    .withTranslations(translations);

  const instance = await builder.build();


  const computedLocale = computed(()=>{
    locale.value;
    namespacesRef.value;
    return instance.getLocale();
  });

  const computedNamespaces = computed(()=>{
    namespacesRef.value;
    return instance.getNamespaces();
  });

  const translationApi = {
    t: (
      key: string,
      datas?: Record<string, unknown>,
    ) => {
      const translated = instance.safeTranslate(key, datas);

      return translated.success ? translated.result : key;
    },

    setLocale: async (newLocale?: string) => {
      await instance.setLocale(newLocale);
      locale.value = newLocale;
      onLocaleChange(newLocale);
    },

    getLocale: () => {
      return computedLocale;
    },

    addNamespaces: async (...namespaces: string[]) => {
      await instance.addNamespaces(...namespaces);
      namespacesRef.value = instance.getNamespaces();
    },

    removeNamespaces: async (...namespaces: string[]) => {
      await instance.removeNamespaces(...namespaces);
      namespacesRef.value = instance.getNamespaces();
    },

    setNamespaces: async (namespaces: string[]) => {
      await instance.setNamespaces(namespaces);
      namespacesRef.value = instance.getNamespaces();
    },

    getNamespaces() {
      return computedNamespaces;
    },
  };

  return {
    install(app: App) {
      app.provide(PROVIDER_KEY, translationApi);
    },
  };
};
