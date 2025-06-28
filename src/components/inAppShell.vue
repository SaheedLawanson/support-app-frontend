<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navigation from './/Navigation.vue'

const tabs = ['My Requests', 'New Request']
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navigation />
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <TopTabs :tabs="tabs" />
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>
