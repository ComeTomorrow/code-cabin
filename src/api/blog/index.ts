import https from '../../modules/https';
import { AxiosPromise } from 'axios';
import { ArticleData, ArticleResult } from './types';

https.defaults.baseURL=import.meta.env.VITE_BLOGS_APP_API_URL + import.meta.env.VITE_BLOGS_APP_PORT;

export function getArticleContent(id: number): AxiosPromise<ArticleResult> {
    return https.get('/app-api/v1/content/article/get/' + id);
}