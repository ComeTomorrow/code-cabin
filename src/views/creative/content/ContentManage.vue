<script lang="ts" setup>
import { ref, h, computed, CSSProperties } from 'vue'
import { getArticles } from '../../../api/creative/index'

const loading = ref(true)

const activeKey = ref('1')

const data: string[] = ref([
    {
        s:'Racing car sprays burning fuel into crowd.',
        ss:'Japanese princess to wed commoner.',
 
    },
    {
        saa: 'Australian walks 100km after outback crash.',
        sas:'Man charged over missing wedding girl.',
        asd:'Los Angeles battles huge wildfires.',
    }
])

const getArticleList = (): void => {
    // getArticles(data).then(res => {
        // if(res.data != null){
        //     data.value.id = res.data
        //     message.success('保存成功')
        //     router.push(
        //         {
        //             path: '/md',
        //             query: {
        //                 articleId: data.value.id,
        //             },
        //         }
        //     )
        // }
    // }).catch(() => {
    //     loading.value = false;
    // }).finally(() => {
    //     loading.value = false;
    // });
}

</script>

<template>
    <a-card :bordered="false">
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="文章">
                <a-list bordered :data-source="data">
                    <template #renderItem="{ item }">
                        <a-list-item>
                            <a-image :width="160" :height="90" :preview=false
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                            {{ item }}
                        </a-list-item>
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

.ant-list-bordered {
    border: 0px;
}

.ant-list-item {
    padding-inline: 0px;
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