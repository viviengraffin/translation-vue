import type {
  ComputedRef,
  VNode,
} from "@vue/runtime-core";
import type {
  LocaleFormat,
  TranslationContainer,
  EnvironmentArgument
} from "@viviengraffin/translation-core";
import type { Plugin } from "vue";

export type VueTranslation = VNode;

export type CreateTranslationVuePluginReturns = Promise<Plugin>;

export type TranslationVuePluginOptions = {
  translations: TranslationContainer<VueTranslation>;
  locale?: string | (() => string | undefined | Promise<string | undefined>);
  fallbackLocale?: string;
  localeFormat?: LocaleFormat;
  environment?: EnvironmentArgument;
  onLocaleChange?: (locale?: string) => void | Promise<void>;
  separator?: string;
};

export type TranslationApi = {
  t(key: string, datas?: Record<string, unknown>): VueTranslation | string;
  setLocale(locale?: string): Promise<void>;
  getLocale(): ComputedRef<string>;
  addNamespaces(...namespaces: string[]): Promise<void>;
  removeNamespaces(...namespaces: string[]): Promise<void>;
  setNamespaces(namespaces: string[]): Promise<void>;
  getNamespaces(): ComputedRef<string[]>;
};
