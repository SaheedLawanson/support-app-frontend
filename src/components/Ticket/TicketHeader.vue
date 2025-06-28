<script setup lang="ts">
import { toLongDate } from '@/helpers/date'

defineProps<{
  reference: string
  title: string
  status: string
  createdAt: Date
}>()
</script>

<template>
  <div class="p-6 border-b border-gray-200">
    <div class="flex justify-between items-start">
      <!-- Ticket Title Left -->
      <div>
        <div class="flex items-center">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ title }}
          </h2>
          <span
            class="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
          >
            {{ status }}
          </span>
        </div>
        <p class="mt-1 text-sm text-gray-500">
          Ticket {{ reference }} • Created on {{ toLongDate(createdAt) }}
        </p>
      </div>
    </div>
  </div>
</template>
