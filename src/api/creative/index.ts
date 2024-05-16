import https from '../../modules/https';
import { AxiosPromise } from 'axios';
import { ArticleData, ArticleResult } from './types';

https.defaults.baseURL=import.meta.env.VITE_BLOGS_APP_API_URL + import.meta.env.VITE_BLOGS_APP_PORT;

export function saveArticle(data: ArticleData): AxiosPromise<ArticleResult> {
    return https({
        url: '/app-api/v1/content/article/save',
        method: 'post',
        data: data,
    });
}

export function getArticles(data: ArticleData): AxiosPromise<ArticleResult> {
    return https({
        url: '/app-api/v1/content/article/page',
        method: 'get',
        data: data,
    });
}