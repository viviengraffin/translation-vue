import {
  type Translation,
  TranslationBase,
  type TranslationObject,
} from "@viviengraffin/translation-core";
import { isVNode } from "vue";
import type { VueTranslation } from "./types.ts";

export class TranslationVue extends TranslationBase<VueTranslation> {
  manageTranslation(
    translation: Translation<VueTranslation>,
    datas: Record<string, unknown> | undefined,
  ): VueTranslation {
    return typeof translation === "function" ? translation(datas) : translation;
  }

  protected searchInTranslationObject(
    translationObject: TranslationObject<
      VueTranslation
    >,
    keyParts: string[],
  ):
    | Translation<VueTranslation>
    | null {
    const { key, parts } = this.getKeyDatas(keyParts);

    const value = translationObject[key];

    switch (typeof value) {
      case "function":
        return value;
      case "object":
        if (value === null) return null;

        if (isVNode(value)) {
          return value;
        }

        return this.searchInTranslationObject(
          value,
          parts,
        );
      default:
        return null;
    }
  }
}
