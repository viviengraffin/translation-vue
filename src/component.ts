import { defineComponent, type PropType, type DefineComponent } from "vue";
import { useTranslation } from "@/hook.ts";

export type TranslationProps = {
  name: string;
  datas?: Record<string, any>;
}

export const Translation: DefineComponent<TranslationProps> = defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    datas: {
      type: Object as PropType<Record<string, any>>,
      required: false,
    },
  },

  setup(props) {
    const { t } = useTranslation();

    return () => t(props.name, props.datas).value;
  },
});
