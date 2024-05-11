<script lang="ts" setup>
import { ref, h, computed, CSSProperties } from 'vue'

const loading = ref(true);

const activeKey = ref('1');

</script>

<template>
    <a-card :bordered="false">
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="文章">
                <a-table :columns="columns" :data-source="data">
                    
                </a-table>
            </a-tab-pane>
            <a-tab-pane key="2" tab="下载">Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane key="3" tab="回答">Content of Tab Pane 3</a-tab-pane>
            <a-tab-pane key="4" tab="视频">Content of Tab Pane 4</a-tab-pane>
        </a-tabs>
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