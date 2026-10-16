import type { Translation } from "@/component.ts";

declare module "vue" {
    export interface GlobalComponents {
        Translation: typeof Translation;
    }
}

export {};