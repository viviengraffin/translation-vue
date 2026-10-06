import type { TranslationApi, TranslationVuePluginOptions } from "@/types.ts";
import { createTranslationVuePlugin } from "@/plugin.ts";
import { DEFAULT_FALLBACK_LOCALE, EnvironmentBase, type Locale, toLocalArray, toUniqueArray } from "@viviengraffin/translation-core";

type CreateTranslationPluginSetupReturns = { key: symbol; api: TranslationApi };

export async function createTranslationPluginSetup(
  options: TranslationVuePluginOptions,
): Promise<CreateTranslationPluginSetupReturns> {
  const plugin = await createTranslationVuePlugin(options);

  let key: symbol;
  let api: TranslationApi;

  const mockApp: any = {
    provide(keyName: symbol, value: TranslationApi) {
      key = keyName;
      api = value;
    },
  };

  plugin.install!(mockApp);

  return {
    key: key!,
    api: api!,
  };
}

export class TestEnvironment extends EnvironmentBase {
    override getLocales({ locale, fallbackLocale = DEFAULT_FALLBACK_LOCALE }: { locale?: string; fallbackLocale?: string; }): Locale[] {
      return toLocalArray(toUniqueArray([
        ...(locale ? [locale] : []),
        fallbackLocale
      ]));
    }
}
