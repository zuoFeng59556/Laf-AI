<script setup lang="ts"></script>

<template>
  <nav class="bg-gray-500">
    <div class="mx-auto px-2 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- 左侧logo -->
        <div class="flex-shrink-0 flex items-center hover:cursor-pointer">
          <!-- LOGO 图片位置 -->
          <img class="h-8 w-8" src="@/assets/logo.jpg" alt="Logo" />
          <span class="text-white font-bold ml-2">Laf AI</span>
        </div>
        <!-- 右侧菜单 -->
        <div class="block">
          <div class="ml-4 flex items-center md:ml-6">
            <span
              class="text-gray-300 hover:text-white hover:cursor-pointer px-3 py-2 rounded-md text-sm font-medium"
              >剩余</span
            >
            <span
              class="text-gray-300 hover:text-white hover:cursor-pointer px-3 py-2 rounded-md text-sm font-medium"
              >充值</span
            >
            <span
              class="text-gray-300 hover:text-white hover:cursor-pointer px-3 py-2 rounded-md text-sm font-medium"
              >交流群</span
            >
            <span
              class="text-gray-300 hover:text-white hover:cursor-pointer px-3 py-2 rounded-md text-sm font-medium"
              >登录</span
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
