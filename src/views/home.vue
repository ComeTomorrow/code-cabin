<script setup lang="ts">
import { useCounterStore } from "../modules/pinia/stores/counter"; 
import login from "./in-website/login.vue";

const counter = useCounterStore()
</script>

<template>
i am home
  <div @click="counter.increment()">我是首页{{counter.num}}</div>

  <login></login>

</template>