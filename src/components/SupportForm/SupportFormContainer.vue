<template>
  <div class="bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto lg:col-span-3">
    <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900">Create New Support Request</h3>
      <button id="closeModalBtn" class="text-gray-400 hover:text-gray-500">
        <div class="w-6 h-6 flex items-center justify-center">
          <i class="ri-close-line"></i>
        </div>
      </button>
    </div>
    <div class="px-6 py-4">
      <slot />
    </div>
  </div>
</template>
