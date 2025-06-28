<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  activeTagIndex: {
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

const activeTagIndex = ref(props.activeTagIndex)

const handleTabClick = (index: number) => {
  activeTagIndex.value = index
  props.onTabClick(index)
}
</script>

<template>
  <div class="border-b border-gray-200 mb-6">
    <div class="flex space-x-8">
      <button
        v-for="(tab, index) in tabs"
        @click="handleTabClick(index)"
        :key="index"
        :class="`${index === activeTagIndex ? 'border-b-2 border-primary' : ''} py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap`"
      >
        {{ tab }}
      </button>
    </div>
  </div>
</template>

<!-- color: #4f46e5;
border-bottom: 2px solid #4f46e5; -->
