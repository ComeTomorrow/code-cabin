<script lang="ts" setup>
import { ref, computed } from 'vue'
// import { getLang } from '@/utils/auth'
// import enUS from '@kangc/v-md-editor/lib/lang/en-US'
// import zhEn from '@kangc/v-md-editor/lib/lang/zh-CN'
// const lang = getLang() === 'zh-cn' ? 'zh-CN' : 'en-US'
// const langObj = getLang() === 'zh-cn' ? zhEn : enUS
// VueMarkdownEditor.lang.use(lang, langObj)
// ......上面这些是多语言配置，如果用不到切换语言请忽略 ......
interface Props {
    height?: string // 编辑器的高度
    placeholder?: string
    content: string
}
interface EmitEvent {
    (e: 'update:textValue', params: string): void,
    (e: 'update:htmlValue', params: string): void
}
const props = withDefaults(defineProps<Props>(), {
    height: '640px',
    placeholder: '请输入内容',
    content: '',
})
const emit = defineEmits<EmitEvent>()
const markdownContent = computed({
    get() {
        return props.content
    },
    set(value: string) {
        emit('update:textValue', value)
    }
})

// 内容变化时触发的事件。text 为输入的内容，html 为解析之后的 html 字符串。
const handleChange = (text: string, html: string): void => {
    // console.log(JSON.stringify(text))
    // 如果有需要这些值，可以传回给父组件
    // emit('update:textValue', text)
    emit('update:htmlValue', html)
}

</script>

<template>
    <v-md-editor
        :placeholder="props.placeholder"
        :disabled-menus="[]"
        v-model="markdownContent"
        :height="props.height"
        @change="handleChange"></v-md-editor>
</template>

<style lang="less" scoped>
</style>