<script lang="ts" setup>
import { ref, h, computed, CSSProperties } from 'vue'
import { getArticles, deleteArticle } from '../../../api/creative/index'
import { FundFilled, EditFilled, EyeFilled, DeleteFilled } from '@ant-design/icons-vue'

const loading = ref(true)

const activeKey = ref('1')

const listData: Record<string, string>[] = ref()

const open: boolean = ref(false);

const getArticleList = (data:any): void => {
    getArticles(data).then(res => {
        if(res.data != null){
            const { list } = res.data;
            listData.value=list;
        }
    }).catch(() => {
        loading.value = false;
    }).finally(() => {
        loading.value = false;
    });
}

const delArticle = (id: number): void => {
    open.value = true;
    // deleteArticle(id).then(res => {
    //     if(res.data != null){
    //         console.log(res)
    //     }
    // }).catch(() => {
    //     loading.value = false;
    // }).finally(() => {
    //     loading.value = false;
    // });
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
                        <a-list-item key="item.title">
                            <template #actions>
                                <a-button type="text" shape="circle" size="small" :icon="h(FundFilled)" />
                                <a-button type="text" shape="circle" size="small" :icon="h(EyeFilled)" />
                                <a-button type="text" shape="circle" size="small" :icon="h(EditFilled)" />
                                <a-button type="text" danger shape="circle" size="small" :icon="h(DeleteFilled)" @click="delArticle(item.id)"/>
                            </template>
                            
                            <template #extra>
                                <img width="160" height="90" alt="logo" :src="item.coverAddress" />
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
                    </template>
                    <a-modal v-model:open="open" title="Modal" ok-text="确认" cancel-text="取消" @ok="hideModal">
                        <p>Bla bla ...</p>
                        <p>Bla bla ...</p>
                        <p>Bla bla ...</p>
                    </a-modal>
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