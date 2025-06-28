<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  title: string
  description: string
  userType: 'customer' | 'agent'
}>()
</script>

<template>
  <RouterLink
    id="customer-card"
    :to="`/sign-in/${userType}`"
    class="flex-1 bg-white rounded-lg shadow-md p-8 text-center cursor-pointer border-2 border-transparent hover:border-primary transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
  >
    <div class="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
      <i :class="`pi pi-${userType === 'customer' ? 'user' : 'headphones'} text-primary`"></i>
    </div>
    <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ title }}</h3>
    <p class="text-gray-600 text-sm">{{ description }}</p>
  </RouterLink>
</template>
