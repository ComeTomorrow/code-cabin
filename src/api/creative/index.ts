import request from '../../modules/https';
import { AxiosPromise } from 'axios';
import { ArticleData, ArticleResult } from './types';

export function saveArticle(data: ArticleData): AxiosPromise<ArticleResult> {
    return request({
        url: '/app-api/v1/content/article/save',
        method: 'post',
        data: data,
    });
}
