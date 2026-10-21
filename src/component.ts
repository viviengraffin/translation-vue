import { type DefineComponent, defineComponent, type PropType } from "vue";
import { useTranslation } from "@/hook.ts";

export type TranslationProps = {
  name: string;
  datas?: Record<string, any>;
};

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
    const { translate } = useTranslation();

    return () => translate(props.name, props.datas).value;
  },
});
