<script setup lang="ts">
import { useAuthStore } from '@/stores/user'

const userStore = useAuthStore()
</script>

<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <span class="ml-2 font-['Pacifico'] text-primary text-2xl font-medium">Support Portal</span>
      </div>
      <div class="flex items-center">
        <div class="flex items-center">
          <div
            class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium"
          >
            JD
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-700">
              {{ userStore.user?.firstName }} {{ userStore.user?.lastName }}
            </p>
            <p class="text-xs text-gray-500">{{ userStore.user?.email }}</p>
          </div>
          <button class="ml-2 text-gray-400 hover:text-gray-600">
            <div class="w-8 h-8 flex items-center justify-center">
              <i class="ri-arrow-down-s-line"></i>
            </div>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
