import { assertEquals } from "@std/assert";
import { PROVIDER_KEY } from "@/const.ts";
import translations from "./translations/main.ts";
import { createTranslationPluginSetup, TestEnvironment } from "./lib.ts";

Deno.test("createTranslationVuePlugin - Must be provide API via provide", async () => {
  const { key: providedKey, api: providedApi } =
    await createTranslationPluginSetup({
      translations,
      locale: "fr",
      environment: TestEnvironment
    });

  assertEquals(providedKey!, PROVIDER_KEY);

  assertEquals(typeof providedApi!.t, "function");
  assertEquals(typeof providedApi!.setLocale, "function");
  assertEquals(typeof providedApi!.getLocale, "function");

  const currentLocaleComputed = providedApi!.getLocale();
  assertEquals(currentLocaleComputed.value, "fr");

  await providedApi!.setLocale("en");
  assertEquals(currentLocaleComputed.value, "en");
});
