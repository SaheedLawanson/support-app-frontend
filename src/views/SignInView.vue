<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import AuthApi from '@/api/auth.api'
import { useAuthStore } from '@/stores/user'

const toast = useToast()
const router = useRouter()
const route = useRoute()

const userType = ref(route.params.userType as 'customer' | 'agent')
const isLoading = ref(false)

const form = reactive({
  email: '',
  password: '',
})

const formErrors = ref<string[]>([])

const handleSignIn = async () => {
  formErrors.value = []

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!form.email) {
    formErrors.value.push('Email is required')
  } else if (!emailPattern.test(form.email)) {
    formErrors.value.push('Email is invalid')
  }

  if (!form.password) {
    formErrors.value.push('Password is required')
  } else if (form.password.length < 8) {
    formErrors.value.push('Password must be at least 8 characters long')
  }

  if (formErrors.value.length > 0) {
    return
  }

  console.log('Form Submitted:', form)

  try {
    isLoading.value = true
    const result = await AuthApi.signIn(form.email, form.password)
    localStorage.setItem('token', result.token)
    console.log('result', result)
    toast.success('Sign in successful')
    router.push('/support-request')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Sign in failed'
    toast.error(errorMessage)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div id="customer-login" class="min-h-screen flex flex-col justify-center items-center p-2">
    <div class="mb-6 text-center">
      <h1 class="text-3xl font-['Pacifico'] text-primary">logo</h1>
      <h2 class="mt-2 text-xl font-semibold text-gray-800">
        {{ userType === 'customer' ? 'Customer Support Portal' : 'Agent Sign In' }}
      </h2>
    </div>

    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h3 class="text-xl font-semibold text-gray-800 mb-6 text-center">Sign In</h3>

      <form @submit.prevent="handleSignIn">
        <div class="mb-10">
          <p v-for="error in formErrors" :key="error" class="text-red-500 text-sm">{{ error }}</p>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="pi pi-envelope text-gray-400"></i>
            </div>
            <input
              v-model="form.email"
              type="email"
              id="email"
              class="pl-10 border-2 border-gray-300 rounded-md p-2 w-full"
              placeholder="your.email@example.com"
              required
            />
          </div>
        </div>

        <div class="mb-4">
          <div class="flex items-center justify-between mb-1">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="pi pi-lock text-gray-400"></i>
            </div>
            <input
              v-model="form.password"
              type="password"
              id="password"
              class="pl-10 w-full border-2 border-gray-300 rounded-md p-2"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-primary text-white py-2 px-4 rounded-button hover:bg-primary-dark transition-colors duration-200 font-medium whitespace-nowrap"
        >
          {{ isLoading ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>

      <div class="mt-8 border-t border-gray-200 text-center cursor-pointer">
        <button
          @click="userType === 'customer' ? (userType = 'agent') : (userType = 'customer')"
          class="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center mx-auto py-8"
        >
          <i :class="`pi pi-${userType === 'customer' ? 'headphones' : 'user'} mr-3`"></i>
          {{ `Switch to ${userType === 'customer' ? 'Agent' : 'Customer'} Login` }}
        </button>
      </div>
    </div>
  </div>
</template>
