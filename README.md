# translation-vue

A reactive translation library for Vue 3 that lets you define translation using
Vue VNodes or dynamic functions returns Vue VNodes.

Based on
[@viviengraffin/translation-core](https://jsr.io/@viviengraffin/translation-core).

## Quick start

1. Define your translations

You can use Vue's h() function to create translations in regular TypeScript
files.

Create `translations/en.ts`:

```ts
import { h } from "vue";
import type { TranslationObject } from "@viviengraffin/translation-core";
import type { VueTranslation } from "@viviengraffin/translation-vue";

export default {
  hello: {
    world: h("h1", "Hello World"),
    user: ({ name }) => h("h1", `Hello ${name}`),
  },
} satisfies TranslationObject<VueTranslation>;
```

If JSX is configured in your project, you can replace this file by
`translations/en.tsx`:

```tsx
import type { TranslationObject } from "@viviengraffin/translation-core";
import type { VueTranslation } from "@viviengraffin/translation-vue";

export default {
  hello: {
    world: <h1>Hello World</h1>,
    user: ({ name }) => <h1>Hello ${name}</h1>,
  },
} satisfies TranslationObject<VueTranslation>;
```

Create `translations/index.ts`:

```ts
import type { TranslationObjectByLocale } from "@viviengraffin/translation-core";
import type { VueTranslation } from "@viviengraffin/translation-vue";

export default {
  en: async () => (await import("./en")).default,
} satisfies TranslationObjectByLocale<VueTranslation>;
```

2. Create and configure plugin

In `main.ts` (in a vite project) :

```ts
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createTranslationVuePlugin } from "@viviengraffin/translation-vue";
import translations from "./translations/index.ts";

createApp(App)
  .use(
    await createTranslationVuePlugin({
      translations,
      // Here, a function to initialize the selected locale
      locale() {
        return localStorage.getItem("locale") ?? undefined;
      },
      // Here, a function to save the selected locale (in the localStorage in this example)
      onLocaleChange(locale) {
        if (locale === undefined) {
          localStorage.removeItem("locale");
          return;
        }
        localStorage.setItem("locale", locale);
      },
    }),
  )
  .mount("#app");
```

3. In vue files

`App.vue` :

```vue
<script setup lang="ts">
import { useTranslation } from "@viviengraffin/translation-vue";
const { getLocale, setLocale } = useTranslation();
const locale = getLocale();
</script>
<template>
    <!-- Translation get the translation -->
	<Translation name="hello.user" :datas="{ name:'John' }" />
	<template v-if="locale==='en'">
		<button @click="setLocale('fr')">Français</button>
	</template>
	<template v-else>
		<button @click="setLocale('en')">English</button>
	</template>
</template>
```
