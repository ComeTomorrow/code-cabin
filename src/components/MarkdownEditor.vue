<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
// 1.1 引入Vditor 构造函数
import Vditor from 'vditor'
// 1.2 引入样式
import 'vditor/dist/index.css';

interface EmitEvent {
    (e: 'update:textValue', params: string): void,
}

const emit = defineEmits<EmitEvent>()

// 2. 获取DOM引用
const vditor = ref()

// 3. 在组件初始化时，就创建Vditor对象，并引用
onMounted(() => {
    vditor.value = new Vditor('vditor', options.value)
})

const options = ref({
    placeholder: '请在此处输入Markdown文本',
    height: '80vh',
    width: '100%',
    theme: 'dark 2',
    mode: "sv",
    preview: {
        theme: {
            current: "ant-design"
        },
        hljs: {
            style: "native"
        },
        mode: "both"
    },
    focus(value: string){
    },
    keydown(event: KeyboardEvent){
        if(event.key === 'Tab'){
            event.preventDefault(); // 阻止默认行为（如果需要）
            const editor = vditor.value.vditor.element;
            const doc = editor.ownerDocument.defaultView;
            const selection = doc.getSelection();
            const range = selection.getRangeAt(0);
            const tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
            range.insertNode(tabNode);
            range.setStartAfter(tabNode);
            range.setEndAfter(tabNode);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    },
    input(value: string){
        emit('update:textValue', value)
        // console.log(value)
    },
    after: () => {
        emit('update:textValue', vditor.value.getValue())
    },
})

</script>

<template>
    <!-- 指定一个容器 -->
    <div id="vditor" ref="vditor"></div>
</template>

<style lang="less" scoped>
</style>