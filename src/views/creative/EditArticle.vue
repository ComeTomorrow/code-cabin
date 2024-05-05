<script lang="ts" setup>
import { ref, computed } from 'vue'
import MarkdownEditor from '../../components/MarkdownEditor.vue'

</script>

<template>
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <div class="logo"></div>
            <a-button type="primary">Primary Button</a-button>
        </a-layout-header>
        <a-layout-content :style="{ marginTop: '64px' }">
            <MarkdownEditor />
        </a-layout-content>
    </a-layout>
</template>

<style lang="less" scoped>
</style>