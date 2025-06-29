<script setup lang="ts">
import { useAuthStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useAuthStore()
const router = useRouter()

const logout = () => {
  console.log('Logout clicked')
  userStore.setUser(null)
  localStorage.removeItem('token')
  router.push('/')
}
</script>

<template>
  <div
    class="absolute right-4 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200"
  >
    <div class="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">User Menu</div>
    <button
      @click="logout"
      class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
    >
      <div class="w-4 h-4 flex items-center justify-center mr-3">
        <i class="pi pi-sign-out"></i>
      </div>
      Logout
    </button>
  </div>
</template>
