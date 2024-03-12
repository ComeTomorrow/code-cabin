<script setup lang="ts">
import { useCounterStore } from "../stores/counter"

const counter = useCounterStore()
</script>

<template>
i am home
  <div @click="counter.inc()">我是首页{{counter.num}}</div>
</template>