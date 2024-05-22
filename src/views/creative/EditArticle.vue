<script lang="ts" setup>
import { ref, h, computed, CSSProperties } from 'vue'
import { LeftOutlined } from '@ant-design/icons-vue';
import { generateDraft, saveArticle } from '../../api/creative'
import MarkdownEditor from '../../components/MarkdownEditor.vue'
import htmlBlocks from 'markdown-it/lib/common/html_blocks.mjs';
import router from '../../modules/router';
import { message } from 'ant-design-vue';

const loading = ref(true);

const headerStyle: CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    //   paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#efefef',
    position: 'fixed', 
    zIndex: 1, 
    width: '100%'
};

const data = ref({
    id: null,
    title: '',
    content: '',
    markdownContent: ''
})

const getMarkdownContent = (value: string): void => {
    console.log(value)
    data.value.markdownContent = value;
}

const getContent = (value: string): void => {
    data.value.content = value;
}

const saveDraft = (): void => {
    console.log(data.value)
    if(router.currentRoute.value.query){
        data.value.id = router.currentRoute.value.query['articleId'];
    }
    // generateDraft(data.value).then(res => {
    //     if(res.data != null){
    //         data.value.id = res.data
    //         message.success('保存成功')
    //         router.push(
    //             {
    //                 path: '/creative/md',
    //                 query: {
    //                     articleId: data.value.id,
    //                 },
    //             }
    //         )
    //     }
    // }).catch(() => {
    //     loading.value = false;
    // }).finally(() => {
    //     loading.value = false;
    // });
}

// const publishArticle = (): void => {
//     // saveArticle()
// }

</script>

<template>
    <a-layout>
        <a-layout-header :style="headerStyle">
            <a-button type="text" :icon="h(LeftOutlined)">文章管理</a-button>
            <a-input class="title-input" v-model:value="data.title" placeholder="请输入文章标题（5~100个字）" :maxlength="100"/>
            <a-button @click="saveDraft">保存草稿</a-button>
            <!-- <a-button type="primary" @click="publishArticles">发布文章</a-button> -->
        </a-layout-header>
        <a-layout-content :style="{ marginTop: '64px' }">
            <MarkdownEditor @update:textValue="getMarkdownContent" :content="data.content"/>
        </a-layout-content>
    </a-layout>
</template>

<style lang="less" scoped>
.title-input{
    width: 600px;
}
</style>