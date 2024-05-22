import https from '../../modules/https';
import { AxiosPromise } from 'axios';
import { ArticleData, ArticleResult } from './types';

https.defaults.baseURL=import.meta.env.VITE_BLOGS_APP_API_URL + import.meta.env.VITE_BLOGS_APP_PORT;

export function generateDraft(data: ArticleData): AxiosPromise<ArticleResult> {
    return https.put('/app-api/v1/content/article/draft', {data: data});
}

export function saveArticle(data: ArticleData): AxiosPromise<ArticleResult> {
    return https.put('/app-api/v1/content/article/save', {data: data});
}

export function getArticles(params: ArticleData): AxiosPromise<ArticleResult> {
    return https.get('/app-api/v1/content/article/page', {params: params});
}

export function deleteArticle(id: number): AxiosPromise<ArticleResult> {
    return https.delete('/app-api/v1/content/article/delete/' + id);
}

export function getArticleContent(id: number): AxiosPromise<ArticleResult> {
    return https.get('/app-api/v1/content/article/get/' + id);
}