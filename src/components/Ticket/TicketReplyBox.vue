<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  handleSubmit: (text: string) => void
}>()

const text = ref('')

const onSubmit = () => {
  props.handleSubmit(text.value)
}
</script>

<template>
  <div class="mt-6">
    <h4 class="text-sm font-medium text-gray-700 mb-2">Add a reply</h4>
    <div class="border border-gray-300 rounded-lg overflow-hidden">
      <textarea
        v-model="text"
        class="w-full p-3 text-sm text-gray-700 border-none focus:ring-0"
        rows="4"
        placeholder="Type your message here..."
      ></textarea>
      <div class="bg-gray-50 px-3 py-2 flex justify-between items-center">
        <div class="flex space-x-2">
          <button class="p-2 text-gray-500 hover:text-gray-700 rounded">
            <div class="w-5 h-5 flex items-center justify-center">
              <i class="pi pi-paperclip"></i>
            </div>
          </button>
          <button class="p-2 text-gray-500 hover:text-gray-700 rounded">
            <div class="w-5 h-5 flex items-center justify-center">
              <i class="ri-emotion-line"></i>
            </div>
          </button>
        </div>
        <button
          @click.prevent="onSubmit"
          :disabled="text.length === 0"
          :class="{
            'opacity-50 cursor-not-allowed': text.length === 0,
          }"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-button shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none whitespace-nowrap"
        >
          Send Reply
        </button>
      </div>
    </div>
  </div>
</template>
