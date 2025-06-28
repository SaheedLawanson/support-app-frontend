<script setup lang="ts">
defineProps<{
  description: string
  attachments?: string[]
}>()
</script>

<template>
  <div class="mb-8">
    <h3 class="text-base font-medium text-gray-900 mb-2">Description</h3>
    <p class="text-sm text-gray-600">
      {{ description }}
    </p>
    <div v-if="attachments" class="mt-4 flex items-center space-x-2">
      <div
        v-for="(attachment, index) in attachments"
        :key="index"
        class="inline-block p-2 bg-gray-100 rounded-lg"
      >
        <div class="flex items-center">
          <div class="w-5 h-5 flex items-center justify-center text-gray-500 mr-2">
            <i class="pi pi-file-arrow-up"></i>
          </div>
          <span class="text-xs text-gray-700">{{ `attachment${index + 1}.png` }}</span>
          <a :href="attachment" class="ml-2 text-xs text-primary hover:text-primary-dark">View</a>
        </div>
      </div>
    </div>
  </div>
</template>
