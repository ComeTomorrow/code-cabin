<script lang="ts" setup>
import { ref, computed, h, createVNode, CSSProperties } from 'vue'
import { getArticleContent } from '../../../api/blog'
import { Modal, message } from 'ant-design-vue';
import MarkdownIt from 'markdown-it'

// 1、新建实例md：
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})
// 2、然后就在md上调用render方法， 把markdown的格式转成html的格式
// 新增计算属性

// const markdownText = ref('```console.log("巧妹")```')
const markdownText = ref("")
const loading: boolean = ref(false)

const currentHTML = computed(() => {
    // 先判断存不存在，因为一开始currentPost有可能是undefined，在没有拿回数据的时候。
    if (markdownText.value ) {
        return md.render(markdownText.value)
    } 
})

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

getArticleDetails(1)
</script>

<template>
    <a-card :bordered="false">
        <div v-html="currentHTML"></div> 
    </a-card>
</template>

<style lang="less" scoped>

</style>