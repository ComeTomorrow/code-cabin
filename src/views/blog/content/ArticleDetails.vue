<script lang="ts" setup>
import { ref, computed, h, createVNode, CSSProperties } from 'vue'
import { getArticleContent } from '../../../api/blog'
import { Modal, message } from 'ant-design-vue';

const markdownText = ref('')

const loading: boolean = ref(true)

const getArticleDetails = (id: number): void => {
    getArticleContent(id).then(res => {
        if(res.data != null){
            markdownText.value = res.data.markdownContent
        }
    }).catch(res => {
        message.success(res.msg)
    }).finally(() => {
        loading.value = false;
    });
}

getArticleDetails(52)
</script>

<template>
    <a-card :bordered="false">
    </a-card>
</template>

<style lang="less" scoped>

</style>