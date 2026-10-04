import type {
  ComputedRef,
  RendererElement,
  RendererNode,
  VNode,
} from "@vue/runtime-core";
import type {
  Constructor,
  EnvironmentBase,
  LocaleFormat,
  TranslationContainer,
} from "@viviengraffin/translation-core";
import type { ObjectPlugin } from "vue";

export type VueTranslation = VNode<
  RendererNode,
  RendererElement,
  { [key: string]: any }
>;

export type CreateTranslationVuePluginReturns = Promise<ObjectPlugin<void>>;

export type TranslationVuePluginOptions = {
  translations: TranslationContainer<VueTranslation>;
  locale?: string | (() => string | undefined | Promise<string | undefined>);
  fallbackLocale?: string;
  localeFormat?: LocaleFormat;
  environment?: Constructor<EnvironmentBase>;
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
