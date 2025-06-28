<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
import TopTabs from './components/TopTabs.vue'

const tabs = ['My Requests', 'New Request']
</script>

<template>
  <RouterView />
</template>
