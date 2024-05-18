<script lang="ts" setup>
import { ref, h, createVNode, CSSProperties } from 'vue'
import { getArticles, deleteArticle, getArticleContent } from '../../../api/creative/index'
import { FundFilled, EditFilled, EyeFilled, DeleteFilled, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue';
import router from '../../../modules/router/index';

const loading: boolean = ref(false)

const activeKey = ref('1')

const listData: Record<string, string>[] = ref()

const getArticleList = (data:any): void => {
    loading.value = true;
    getArticles(data).then(res => {
        if(res.data != null){
            const { list } = res.data;
            listData.value=list;
        }
    }).catch(res => {
        message.success(res.msg)
    }).finally(() => {
        loading.value = false;
    });
}

const delArticle = (id: number): void => {
    Modal.confirm({
        icon: createVNode(ExclamationCircleOutlined),
        content: '确定要删除该文章吗？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        async onOk() {
            return await new Promise((resolve, reject) => {
                deleteArticle(id).then(res => {
                    message.success(res.msg)
                    resolve(res.data)
                }).catch(res => {
                    reject(res.msg)
                    message.success(res.msg)
                }).finally(() => {
                    getArticleList({})
                    loading.value = false;
                });
            });
        },
        onCancel() {
            Modal.destroyAll();
        },
    });
}

const editArticle = (id: number): void => {
    const url = router.resolve({
        path: '/creative/md?article='+id,
    });
    console.log(url);
    // 打开新窗口
    window.open(url.href);
}

const browseArticle = (id: number): void => {
    const url = router.resolve({
        path: '/creative/md?article='+id,
    });
    console.log(url);
    // 打开新窗口
    window.open(url.href);
    getArticles(data).then(res => {
        if(res.data != null){
            const { list } = res.data;
            listData.value=list;
        }
    }).catch(res => {
        message.success(res.msg)
    }).finally(() => {
        loading.value = false;
    });
}

getArticleList({})

const pagination = {
    onChange: (page: number) => {
        console.log(page);
    },
    pageSize: 3,
}

setTimeout(function(){
    console.log(listData.value)
}, 1000);
</script>

<template>
    <a-card :bordered="false">
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="文章">
                <a-list item-layout="vertical" size="large" :bordered="false" :pagination="pagination"
                    :data-source="listData">
                    <template #renderItem="{ item }">
                        <a-spin :spinning="loading">
                            <a-list-item key="item.title">
                                <template #actions>
                                    <a-button type="text" shape="circle" size="small" :icon="h(FundFilled)"  @click=""/>
                                    <a-button type="text" shape="circle" size="small" :icon="h(EyeFilled)"  @click="browseArticle(item.id)"/>
                                    <a-button type="text" shape="circle" size="small" :icon="h(EditFilled)" @click="editArticle(item.id)"/>
                                    <a-button type="text" danger shape="circle" size="small" :icon="h(DeleteFilled)" @click="delArticle(item.id)"/>
                                </template>
                                
                                <template #extra>
                                    <img v-show="item.coverAddress?true:false" width="160" height="90" alt="logo" :src="item.coverAddress" />
                                </template>
                                
                                <a-list-item-meta :description="item.description">
                                    <template #title>
                                        <a :href="item.href">{{ item.title }}</a>
                                    </template>
                                    <template #description>
                                        阅读&nbsp;{{ item.hits?item.hits:0 }}&nbsp;
                                        •&nbsp;点赞&nbsp;{{ 0 }}&nbsp;
                                        •&nbsp;评论&nbsp;{{ 0 }}&nbsp;
                                        •&nbsp;收藏&nbsp;{{ 0 }}
                                    </template>
                                </a-list-item-meta>
                            </a-list-item>
                        </a-spin>
                    </template>
                </a-list>
            </a-tab-pane>
            <a-tab-pane key="2" tab="下载">Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane key="3" tab="回答">Content of Tab Pane 3</a-tab-pane>
            <a-tab-pane key="4" tab="视频">Content of Tab Pane 4</a-tab-pane>
        </a-tabs>
    </a-card>
</template>

<style lang="less" scoped>
:deep(.ant-tabs-nav){
    margin: 0;
}

.ant-list-item {
    padding-inline: 0px;
    
    :deep(.ant-list-item-action){
        margin-block-start: 10px;
    }
    :deep(.ant-list-item-meta) {
        margin-block-end: 10px;
        .ant-list-item-meta-title {
            margin-block-end: 10px;
            font-size: 18.11px;
        }
        .ant-list-item-meta-description{
            font-size: 12px;
        }
    }
}

.ant-btn{
    width: 100%;
}
</style>