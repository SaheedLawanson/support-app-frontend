<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { SupportRequest, Comment } from '@/components/types/request.types'
import SupportRequestItem from '@/components/SupportRequestItem.vue'
import TicketHeader from '@/components/Ticket/TicketHeader.vue'
import TicketDescription from '@/components/Ticket/TicketDescription.vue'
import TicketCommentGroup from '@/components/Ticket/TicketCommentGroup.vue'
import TicketComment from '@/components/Ticket/TicketComment.vue'
import TicketReplyBox from '@/components/Ticket/TicketReplyBox.vue'
import TicketContainer from '@/components/Ticket/TicketContainer.vue'
import SupportRequestGroup from '@/components/SupportRequestGroup.vue'
import SupportRequestApi from '@/api/support-request.api'
import CommentApi from '@/api/comment.api'
import { useToast } from 'vue-toastification'
import AuthApi from '@/api/auth.api'
import { useAuthStore } from '@/stores/user'

const activeRequestIndex = ref(0)
const requests = ref<SupportRequest[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const comments = ref<Comment[]>([])
const isLoadingComments = ref(false)
const toast = useToast()

const activeTicket = ref<SupportRequest | null>(null)
const userStore = useAuthStore()

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

const fetchSupportRequests = async () => {
  try {
    isLoading.value = true
    error.value = null

    let data: SupportRequest[] = []

    if (userStore.user?.role === 'CUSTOMER') {
      data = await SupportRequestApi.getMySupportRequests()
    } else {
      data = await SupportRequestApi.getSupportRequests()
    }

    requests.value = data
    if (data.length > 0) {
      activeTicket.value = data[0]
      await fetchComments(data[0].id)
    }
    console.log('Fetched support requests:', data)
  } catch (err) {
    console.error('Error fetching support requests:', err)
    error.value = 'Failed to load support requests'
    toast.error('Failed to load support requests')
  } finally {
    isLoading.value = false
  }
}

const fetchComments = async (requestId: string) => {
  try {
    isLoadingComments.value = true
    const data = await CommentApi.getComments(requestId)
    comments.value = data
    console.log('Fetched comments:', data)
  } catch (err) {
    console.error('Error fetching comments:', err)
    toast.error('Failed to load comments')
  } finally {
    isLoadingComments.value = false
  }
}

const handleSelectRequest = async (id: string) => {
  activeRequestIndex.value = requests.value.findIndex((request) => request.id === id)
  activeTicket.value = requests.value[activeRequestIndex.value]
  await fetchComments(id)
}

const handleAddComment = async (text: string) => {
  if (!activeTicket.value) return

  try {
    const newComment = await CommentApi.createComment(activeTicket.value.id, text)
    comments.value.push(newComment)
    toast.success('Comment added successfully')
  } catch (err) {
    console.error('Error creating comment:', err)
    toast.error(err instanceof Error ? err.message : 'Failed to add comment')
  }
}

onMounted(async () => {
  await fetchAuthUser()
  await fetchSupportRequests()
})
</script>

<template>
  <!-- Loading State -->
  <div v-if="isLoading" class="p-4 text-center text-gray-500">Loading support requests...</div>

  <!-- Error State -->
  <div v-else-if="error" class="p-4 text-center text-red-500">
    {{ error }}
  </div>

  <!-- Ticket List -->
  <SupportRequestContainer v-else-if="requests.length > 0">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-medium text-gray-900">My Requests</h2>
        <div class="relative cursor-pointer">
          <div class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-500">
            <i class="pi pi-filter"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- Requests -->
    <SupportRequestGroup>
      <SupportRequestItem
        v-for="(request, index) in requests"
        :key="request.id"
        :data="request"
        :isActive="index === activeRequestIndex"
        :handleClick="handleSelectRequest"
      />
    </SupportRequestGroup>
  </SupportRequestContainer>

  <!-- Ticket Details -->
  <TicketContainer v-if="activeTicket">
    <TicketHeader
      :reference="activeTicket.reference"
      :title="activeTicket.subject"
      :status="activeTicket.status"
      :createdAt="new Date(activeTicket.createdAt)"
    />
    <div class="p-6">
      <TicketDescription
        :description="activeTicket.description"
        :attachments="activeTicket.attachments"
      />
      <TicketCommentGroup>
        <div v-if="isLoadingComments" class="text-center text-gray-500 py-4">
          Loading comments...
        </div>
        <div v-else class="space-y-6">
          <TicketComment
            v-for="comment in comments"
            :key="comment.id"
            :fullName="`${comment.user.firstName} ${comment.user.lastName}`"
            :text="comment.text"
            :createdAt="new Date(comment.createdAt)"
          />
        </div>
        <TicketReplyBox :handleSubmit="handleAddComment" />
      </TicketCommentGroup>
    </div>
  </TicketContainer>
</template>
