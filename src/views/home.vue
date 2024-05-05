<script setup lang="ts">
import { useCounterStore } from "../modules/pinia/stores/counter"; 

const counter = useCounterStore()
</script>

<template>
i am home
  <div @click="counter.increment()">我是首页{{counter.num}}</div>
</template>