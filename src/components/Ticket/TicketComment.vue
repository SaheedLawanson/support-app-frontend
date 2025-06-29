<script setup lang="ts">
import { toLongDate } from '@/helpers/date'
defineProps<{
  firstName: string
  lastName: string
  text: string
  createdAt: Date
}>()
</script>

<template>
  <div class="flex">
    <div class="flex-shrink-0 mr-3">
      <div
        class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-medium"
      >
        {{ firstName.charAt(0) + lastName.charAt(0) }}
      </div>
    </div>
    <div class="flex-1 bg-gray-50 rounded-lg p-4">
      <div class="flex justify-between items-center mb-1">
        <span class="text-sm font-medium text-gray-900">{{ firstName }} {{ lastName }}</span>
        <span class="text-xs text-gray-500">{{ toLongDate(createdAt) }}</span>
      </div>
      <p class="text-sm text-gray-600">
        {{ text }}
      </p>
    </div>
  </div>
</template>
