<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "vue";

interface HintProps {
  content: string;
  delayDuration?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  class?: HTMLAttributes["class"];
  contentClass?: HTMLAttributes["class"];
}

const props = defineProps<HintProps>();
const side = props.side || "top";
const align = props.align || "center";
const sideOffset = props.sideOffset || 16;
const alignOffset = props.alignOffset || 16;
const delayDuration = props.delayDuration || 300;
</script>

<template>
  <TooltipProvider>
    <Tooltip :delayDuration="delayDuration">
      <TooltipTrigger :class="cn(props.class)">
        <slot />
      </TooltipTrigger>
      <TooltipContent
        :side="side"
        :align="align"
        :sideOffset="sideOffset"
        :alignOffset="alignOffset"
      >
        <p :class="cn(props.contentClass)">
          {{ content }}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
