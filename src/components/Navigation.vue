<script setup lang="ts">
import { useAuthStore } from '@/stores/user'
import NavDropDown from './NavDropDown.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const userStore = useAuthStore()
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement>()

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
  console.log('toggleDropdown called, isDropdownOpen:', isDropdownOpen.value)
}

const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <header class="bg-white shadow-sm relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <span class="ml-2 font-['Pacifico'] text-primary text-2xl font-medium">Support Portal</span>
      </div>
      <div class="flex items-center">
        <div ref="dropdownRef" class="flex items-center relative">
          <div
            class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium"
          >
            <p v-if="userStore.user">
              {{ `${userStore.user?.firstName?.charAt(0)} ${userStore.user?.lastName?.charAt(0)}` }}
            </p>
            <i v-else class="pi pi-user"></i>
          </div>
          <div v-if="userStore.user" class="ml-3">
            <p class="text-sm font-medium text-gray-700">
              {{ userStore.user?.firstName }} {{ userStore.user?.lastName }}
            </p>
            <p class="text-xs text-gray-500">{{ userStore.user?.email }}</p>
          </div>
          <div v-else>?</div>
          <button
            @click="toggleDropdown"
            class="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <div class="w-8 h-8 flex items-center justify-center">
              <i
                class="pi pi-chevron-down transition-transform duration-200"
                :class="{ 'rotate-180': isDropdownOpen }"
              ></i>
            </div>
          </button>
          <NavDropDown v-if="isDropdownOpen" />
        </div>
      </div>
    </div>
  </header>
</template>
