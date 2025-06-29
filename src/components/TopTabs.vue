<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  activeTabIndex: {
    type: Number,
    default: 0,
  },
  tabs: {
    type: Array as PropType<string[]>,
    required: true,
  },
  onTabClick: {
    type: Function as PropType<(index: number) => void>,
    default: () => {},
  },
})
</script>

<template>
  <div class="border-b border-gray-200 mb-6 cursor-pointer">
    <div class="flex space-x-8">
      <button
        v-for="(tab, index) in tabs"
        @click.prevent="onTabClick(index)"
        :key="index"
        :class="`${index === props.activeTabIndex ? 'border-b-2 border-primary' : ''} py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap`"
      >
        {{ tab }}
      </button>
    </div>
  </div>
</template>

<!-- color: #4f46e5;
border-bottom: 2px solid #4f46e5; -->
