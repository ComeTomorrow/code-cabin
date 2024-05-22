<script lang="ts" setup>
import { ref, computed, h, createVNode, CSSProperties,onMounted } from 'vue'
import { getArticleContent } from '../../../api/blog'
import { Modal, message } from 'ant-design-vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

// const preview = ref()

// 3. 在组件初始化时，就创建Vditor对象，并引用
// onMounted(() => {
//     preview.value = new Vditor('preview', {  
//         mode: 'wysiwyg', // 设置为预览模式  
//         value: '# markdownContent.value', // 传入 Markdown 内容  
//         // 其他配置项...  
//     })
    
//     // // 监听 props 的变化并更新 Vditor  
//     // watch(() => this.markdownContent, (newValue) => {  
//     //     vditor.setValue(newValue); // 更新 Vditor 的值  
//     // })
// })


const markdownContent = ref('')
const content = ref('')

const loading: boolean = ref(true)

const getArticleDetails = (id: number): void => {
    getArticleContent(id).then(res => {
        if(res.data != null){
            markdownContent.value = res.data.markdownContent
            content.value = res.data.content
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
    <a-card :bordered="false" >
        <div id="preview" v-html="content"></div>
    </a-card>
</template>

<style lang="less" scoped>

</style>