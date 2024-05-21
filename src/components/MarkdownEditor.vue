<script lang="ts" setup>
import { ref, onMounted } from 'vue'
// 1.1 引入Vditor 构造函数
import Vditor from 'vditor'
// 1.2 引入样式
import 'vditor/dist/index.css';

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
    preview: {
        theme: {
            current: "ant-design"
        },
        hljs: {
            current: "ant-design"
        }
    },
    focus(value: string){
        console.log(value)
    },
    keydown(event: KeyboardEvent){
        if(event.key === 'Tab'){
            event.preventDefault(); // 阻止默认行为（如果需要）   
            var editor = document.getElementById("vditor");
            var doc = editor.ownerDocument.defaultView;
            var sel = doc.getSelection();
            var range = sel.getRangeAt(0);

            var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
            range.insertNode(tabNode);

            range.setStartAfter(tabNode);
            range.setEndAfter(tabNode);
            sel.removeAllRanges();
            sel.addRange(range);
        }
        
        console.log(event.key)
    }

})
</script>

<template>
    <!-- 指定一个容器 -->
    <div id="vditor"></div>
</template>

<style lang="less" scoped>
</style>