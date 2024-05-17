/**
 * 文章请求参数
 */
export interface ArticleData {
    /** 文章标题 */ 
    title: string;

    /** 会员id */
    userId: number;

    /** 副标题 */
    subtitle?: string;

    /** 文章摘要 */
    summary?: string;

    /** 封面地址 */
    coverAddress: string;

    /** 内容 */
    content: string;

    /** markdown内容 */
    markdownContent: string;

    /** 文章类型 */
    type: number;

    /** 原始链接 */
    originalLink: string;

    /** 阅读范围 */
    readType: number; 

    /** 状态 */
    status: number;

    /** 点击量 */
    hits: number;

    /** 来源 */
    source: string;

    /** 审核状态 */
    authorizedStatus: number;

    /** 标签id */
    tagIds: Array<number>;

    /** 栏目id */
    columnIds: Array<number>;
}
  
/**
 * 文章响应
 */
export interface ArticleResult {

    list: Record<string, string>;

    total: number;
}
  