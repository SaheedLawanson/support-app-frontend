<script setup lang="ts">
import UserTypeCard from '../components/UserTypeCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleUserTypeClick = (userType: 'customer' | 'agent') => {
  router.push({ name: 'sign-in', params: { userType } })
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center p-2">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-['Pacifico'] text-primary">logo</h1>
      <h2 class="mt-2 text-xl font-semibold text-gray-800">Support Portal</h2>
    </div>

    <div class="text-center mb-6">
      <p class="text-gray-600">Choose how you want to continue</p>
    </div>

    <div class="flex flex-col md:flex-row gap-6 w-full max-w-3xl">
      <UserTypeCard
        title="I'm a Customer"
        description="Get help with your products, orders, or account"
        userType="customer"
      />
      <UserTypeCard
        title="I'm a Support Agent"
        description="Access the agent portal to manage support requests"
        userType="agent"
      />
    </div>
  </div>
</template>
