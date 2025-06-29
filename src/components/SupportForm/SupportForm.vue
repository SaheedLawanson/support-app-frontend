<script setup lang="ts">
import { reactive, ref, type PropType } from 'vue'
import UploadFileInput from '@/components/UploadFileInput.vue'

export interface SupportRequestForm {
  requestType: string
  subject: string
  description: string
  attachments: File[]
}

const errors = ref<string[]>([])
const isSubmitting = ref(false)

const form = reactive<SupportRequestForm>({
  requestType: '',
  subject: '',
  description: '',
  attachments: [],
})

const handleFileChange = (files: File[]) => {
  form.attachments = files
}

const props = defineProps({
  requestTypes: {
    type: Array as PropType<string[]>,
    default: ['Billing Issue', 'Account Management', 'Product Inquiry', 'Other'],
  },
  onSubmit: {
    type: Function as PropType<(form: SupportRequestForm) => Promise<void>>,
    required: true,
  },
})

const handleSubmit = async (form: SupportRequestForm) => {
  if (isSubmitting.value) return
  isSubmitting.value = true
  try {
    await props.onSubmit(form)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit(form)">
    <div v-for="error in errors" :key="error" class="text-red-500 text-sm">{{ error }}</div>
    <div class="space-y-6">
      <div>
        <label for="requestType" class="block text-sm font-medium text-gray-700 mb-1"
          >Request Type</label
        >
        <div class="relative border-2 border-gray-300 rounded-md px-2">
          <select
            class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
            v-model="form.requestType"
            required
          >
            <option v-for="requestType in requestTypes">{{ requestType }}</option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <div class="w-5 h-5 flex items-center justify-center text-gray-400">
              <i class="ri-arrow-down-s-line"></i>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
        <input
          v-model="form.subject"
          type="text"
          id="subject"
          class="px-4 py-3 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          required
        />
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1"
          >Description</label
        >
        <textarea
          v-model="form.description"
          id="description"
          rows="6"
          class="block w-full px-4 py-3 border-2 border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          required
        ></textarea>
        <p class="mt-1 text-sm text-gray-500">
          Please provide as much detail as possible about your issue.
        </p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
        <UploadFileInput
          :files="form.attachments"
          :maxFileSize="5 * 1024 * 1024"
          :onFilesUploaded="handleFileChange"
          :onError="(error) => errors.push(error)"
        />
      </div>
    </div>
    <div class="mt-6 flex justify-end space-x-3">
      <button
        type="submit"
        :disabled="isSubmitting"
        :class="`${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''} px-4 py-2 border border-transparent text-sm font-medium rounded-button shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none whitespace-nowrap`"
      >
        Submit Request
      </button>
    </div>
  </form>
</template>
