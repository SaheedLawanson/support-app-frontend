<script setup lang="ts">
import { defineProps, ref, type PropType } from 'vue'
import { useToast } from 'vue-toastification'

const props = defineProps({
  files: {
    type: Array as PropType<File[]>,
    required: true,
  },
  onFilesUploaded: {
    type: Function as PropType<(files: File[]) => void>,
    required: true,
  },
  maxFileSize: {
    type: Number,
    required: true,
  },
  onError: {
    type: Function as PropType<(error: string) => void>,
    required: true,
  },
})

const handleFileChange = (event: Event) => {
  let inputFiles = Array.from((event.target as HTMLInputElement).files || [])
  if (!inputFiles || inputFiles.length === 0) return

  console.log('UploadFileInput::files:', props.files)

  inputFiles = inputFiles.filter((file) => !props.files.some((f) => f.name === file.name))

  const totalFileSize = Array.from(inputFiles).reduce((acc, file) => acc + file.size, 0)

  if (totalFileSize > props.maxFileSize) {
    props.onError('File size exceeds 2MB limit')
    return
  }
  props.onFilesUploaded([...props.files, ...inputFiles])
}

const formatFileSize = (size: number) => {
  return size < 1024 * 1024
    ? `${(size / 1024).toFixed(1)} KB`
    : `${(size / (1024 * 1024)).toFixed(1)} MB`
}

// Remove file from list
const removeFile = (index: number) => {
  props.files.splice(index, 1)
}
</script>

<template>
  <div
    class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
  >
    <div v-if="props.files.length > 0">
      <div class="space-y-4">
        <!-- File Upload Input -->
        <div
          class="flex items-center justify-center rounded-full border-2 border-gray-300 px-4 py-2 cursor-pointer overflow-hidden w-12 h-12 relative"
        >
          <i class="pi pi-plus absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></i>
          <input
            v-on:change="handleFileChange"
            name="file-upload"
            class="opacity-0"
            type="file"
            multiple
            id="file-upload"
          />
        </div>

        <!-- File Preview List -->
        <div
          v-for="(file, index) in files"
          :key="file.name"
          class="flex items-center bg-gray-50 p-3 rounded-lg"
        >
          <!-- File Info -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">{{ file.name }}</p>
            <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
          </div>

          <!-- Remove Button -->
          <button
            class="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            @click="removeFile(index)"
          >
            <div class="w-8 h-8 flex items-center justify-center">
              <i class="pi pi-times"></i>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div v-else class="space-y-1 text-center">
      <div class="w-12 h-12 mx-auto flex items-center justify-center text-gray-400">
        <i class="pi pi-cloud-upload"></i>
      </div>
      <div class="flex text-sm text-gray-600">
        <label
          for="file-upload"
          class="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
        >
          <span>Upload files</span>
          <input
            v-on:change="handleFileChange"
            id="file-upload"
            name="file-upload"
            type="file"
            class="sr-only"
            multiple
          />
        </label>
        <p class="pl-1">or drag and drop</p>
      </div>
      <p class="text-xs text-gray-500">PNG, JPG, PDF up to 2MB</p>
    </div>
  </div>
</template>
