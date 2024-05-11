<script lang="ts" setup>
import { ref, h, computed, CSSProperties } from 'vue'

const loading = ref(true)
</script>

<template>
    <a-card title="Card title" :bordered="false">
        <h1>asdasdas</h1>
    </a-card>
</template>

<style lang="less" scoped>
.ant-menu {
    height: 737px;
    background: #efefef;
}

.ant-menu-vertical {
    border: 0px;
}

.ant-card {
    margin: 30px;
    height: 600px;
}
.ant-btn{
    width: 100%;
}
.ant-layout-sider{
    background: #efefef;
}

.ant-layout-header {
    background: #fff;
}

.ant-layout-content {
    background: #efefef;
}
</style>