<script setup lang="ts">
import { NButton, NModal, NInput, useMessage } from "naive-ui";
import { ref } from "vue";
import { cloud } from "@/api/lafAPI";

const showModal = ref(true);
const message = useMessage();
//验证手机号
const tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
const phone = ref("");
const code = ref("");
//判断是否还在倒计时
const codebut = ref(false);
//发送验证码
const content = ref("发送验证码");
//验证码倒计时
const totalTime = ref(60);
//获取验证码按钮日否可以点击
const canClick = ref(true);
const amount = ref(0);

//获取验证码
async function getCode() {
  console.log(phone.value);

  if (!tel.test(phone.value)) {
    message.error("请输入正确的手机号");
    return;
  }
  if (codebut.value) return;
  countDown();
  await cloud.invoke("getCode", { phone: phone.value });
}

//验证码倒计时
function countDown() {
  if (!canClick.value) return;
  codebut.value = true;
  canClick.value = false;
  content.value = totalTime.value + "s后重新发送";
  let clock = window.setInterval(() => {
    totalTime.value--;
    content.value = totalTime.value + "s后重新发送";
    if (totalTime.value < 0) {
      window.clearInterval(clock);
      content.value = "重新发送验证码";
      totalTime.value = 60;
      canClick.value = true; //这里重新开启
      codebut.value = false;
    }
  }, 1000);
}

//验证登录
async function login() {
  const res = await cloud.invoke("login", { phone: phone.value, code: code.value });
  console.log(res);
  if (res.code === 1) {
    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    message.success("登录成功");
    showModal.value = false;
    getAmount();
  } else {
    message.error("无效的验证码");
  }
}

// 获取用户剩余次数
async function getAmount() {
  if (!localStorage.getItem("access_token")) return;
  const res = await cloud.invoke("get-amount");
  amount.value = res.amount;
}
</script>

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

    <n-modal class="modal" v-model:show="showModal" preset="card" title="Dialog">
      <template #header>
        <div>登录</div>
      </template>
      <div>
        <n-input v-model:value="phone" placeholder="请输入手机号" />
        <n-input class="mt-5" v-model:value="code" placeholder="请输入验证码" />
        <n-button class="btn" @click="getCode"> {{ content }} </n-button>
        <n-button class="btn" @click="login" type="primary"> 登录 </n-button>
      </div>
    </n-modal>
  </nav>
</template>

<style>
.modal {
  width: 600px;
}
.btn {
  margin: 20px 20px 0 0px;
}
</style>
