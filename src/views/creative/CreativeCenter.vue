<script lang="ts" setup>
import { ref, h, computed, CSSProperties } from 'vue'
import { MailOutlined, AppstoreOutlined, PieChartOutlined } from '@ant-design/icons-vue'
import type { MenuProps, ItemType } from 'ant-design-vue'
import router from '../../modules/router'

const loading = ref(true)

const state = ref({
    collapsed: false,
    selectedKeys: ['/creative','/creative/content_manage'],
    openKeys: ['sub1'],
    preOpenKeys: ['sub1'],
})

const items = ref([
    {
        key: '/creative',
        icon: () => h(PieChartOutlined),
        label: '首页',
        title: '首页',
    },
    {
        key: '2',
        icon: () => h(MailOutlined),
        label: '管理',
        title: '管理',
        children: [
            {
                key: '/creative/content_manage',
                label: '内容管理',
                title: '内容管理',
            },
            {
                key: '22',
                label: '评论管理',
                title: '评论管理',
            },
            {
                key: '23',
                label: '专栏管理',
                title: '专栏管理',
            },
        ],
    },
    {
        key: '3',
        icon: () => h(AppstoreOutlined),
        label: '数据',
        title: '数据',
        children: [
            {
                key: '31',
                label: '作品数据',
                title: '作品数据',
            },
            {
                key: '32',
                label: '收益数据',
                title: '收益数据',
            },
            {
                key: '33',
                label: '粉丝数据',
                title: '粉丝数据',
            },
        ],
    },
    {
        key: '4',
        icon: () => h(AppstoreOutlined),
        label: '创作活动',
        title: '创作活动',
        children: [
            {
                key: '41',
                label: '活动列表',
                title: '活动列表',
            },
            {
                key: '42',
                label: '投稿管理',
                title: '投稿管理',
            },
        ],
    },
])

const handleClick: MenuProps['onClick'] = e => {
    if (e.key !== router.path) {
        router.push(e.key)
    }
}
</script>

<template>
    <a-layout>
        <a-layout-header>创作中心</a-layout-header>
        <a-layout>
            <a-layout-sider>
                <a-button type="primary">发布</a-button>
                <a-menu v-model:openKeys="state.openKeys" v-model:selectedKeys="state.selectedKeys" 
                    mode="inline" :inline-collapsed="state.collapsed" :items="items" @click="handleClick">
                </a-menu>
            </a-layout-sider>
            <a-layout-content>
                <router-view/>
            </a-layout-content>
        </a-layout>
    </a-layout>
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