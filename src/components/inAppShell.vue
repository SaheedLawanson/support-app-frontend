<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navigation from '@/components/Navigation.vue'
import TopTabs from '@/components/TopTabs.vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/user'
import AuthApi from '@/api/auth.api'
import { useToast } from 'vue-toastification'

const toast = useToast()

const tabs = ['My Requests', 'New Request']
const router = useRouter()
const route = useRoute()
const userStore = useAuthStore()

const activeTabIndex = ref(0)
const isLoading = ref(false)

console.log('inAppShell:', route.path)

if (route.path === '/support-request') {
  activeTabIndex.value = 0
} else {
  activeTabIndex.value = 1
}

const fetchAuthUser = async () => {
  try {
    isLoading.value = true
    const data = await AuthApi.getAuthUser()
    userStore.setUser(data)
    console.log('Fetched auth user:', data)
  } catch (err) {
    console.error('Error fetching auth user:', err)
    toast.error('Failed to load auth user')
  } finally {
    isLoading.value = false
  }
}

const handleTabClick = (index: number) => {
  activeTabIndex.value = index
  const activeTab = tabs[index]

  if (activeTab === 'My Requests') {
    router.replace('/support-request')
  } else {
    router.replace('/support-request/create')
  }
}

onMounted(async () => {
  await fetchAuthUser()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navigation />
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TopTabs :tabs="tabs" :activeTabIndex="activeTabIndex" :onTabClick="handleTabClick" />
      <div class="grid grid-cols-1 lg:grid-cols-3">
        <RouterView />
      </div>
    </main>
  </div>
</template>
