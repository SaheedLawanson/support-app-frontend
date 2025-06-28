<script setup lang="ts">
import { timeAgo, toLongDate } from '@/helpers/date'
import type { PropType } from 'vue'
import type { SupportRequest } from './types/request.types'
import { ref } from 'vue'

const props = defineProps({
  data: { type: Object as PropType<SupportRequest>, required: true },
  isActive: { type: Boolean, default: false },
  handleClick: { type: Function, default: () => {} },
})

const onClick = () => {
  props.handleClick(props.data.id)
}
</script>

<template>
  <li
    :class="`px-4 py-4 hover:bg-gray-50 cursor-pointer ${isActive ? 'bg-blue-50 border-l-4 border-primary' : ''}`"
    @click="onClick"
  >
    <div class="flex justify-between">
      <span class="text-sm font-medium text-primary">{{ data.reference }}</span>
      <span
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
      >
        {{ data.status }}
      </span>
    </div>
    <p class="mt-1 text-sm text-gray-900 font-medium">
      {{ data.subject.length > 100 ? data.subject.slice(0, 100) + '...' : data.subject }}
    </p>
    <div class="mt-2 flex justify-between">
      <p class="text-xs text-gray-500">Updated {{ timeAgo(new Date(data.updatedAt)) }}</p>
      <p class="text-xs text-gray-500">{{ toLongDate(new Date(data.createdAt)) }}</p>
    </div>
  </li>
</template>
