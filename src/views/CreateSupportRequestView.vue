<script setup lang="ts">
import SupportFormContainer from '@/components/SupportForm/SupportFormContainer.vue'
import SupportForm from '@/components/SupportForm/SupportForm.vue'
import SupportRequestApi from '@/api/support-request.api'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import type { SupportRequestForm } from '@/components/SupportForm/SupportForm.vue'
import { useRouter } from 'vue-router'

const requestTypes = ref<string[]>([])
const isLoadingRequestTypes = ref(false)
const toast = useToast()
const router = useRouter()

const fetchRequestTypes = async () => {
  try {
    isLoadingRequestTypes.value = true
    const data = await SupportRequestApi.getRequestTypes()
    requestTypes.value = data
    console.log('Fetched support requests:', data)
  } catch (err) {
    console.error('Error fetching support requests:', err)
  } finally {
    isLoadingRequestTypes.value = false
  }
}

const uploadFiles = async (files: File[]): Promise<string[] | undefined> => {
  try {
    const data = await SupportRequestApi.uploadFiles(files)
    console.log('Uploaded files:', data)
    return data
  } catch (err) {
    console.error('Error uploading files:', err)
    return
  }
}

const handleCreateSupportRequest = async (form: SupportRequestForm) => {
  const totalFileSize = form.attachments.reduce((acc, file) => acc + file.size, 0)

  if (totalFileSize > 1024 * 1024 * 5) {
    toast.error('File size exceeds 5MB limit')
    return
  }

  let urls: string[] = []

  if (form.attachments.length > 0) {
    const res = await uploadFiles(form.attachments)
    if (!res) {
      toast.error('Failed to upload files')
      return
    }
    urls = res
  }

  const data = {
    ...form,
    attachments: urls,
  }

  try {
    await SupportRequestApi.createSupportRequest(data)
    toast.success('Support request created successfully')
    router.push('/support-request')
  } catch (err) {
    console.error('Error creating support request:', err)
    toast.error(err instanceof Error ? err.message : 'Failed to create support request')
  }
}

onMounted(async () => {
  await fetchRequestTypes()
})
</script>

<template>
  <SupportFormContainer>
    <SupportForm :requestTypes="requestTypes" :onSubmit="handleCreateSupportRequest" />
  </SupportFormContainer>
</template>
