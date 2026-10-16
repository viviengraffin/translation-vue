import { defineComponent, type PropType } from "vue";
import { useTranslation } from "@/hook.ts";

export const Translation = defineComponent({
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
