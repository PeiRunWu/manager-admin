export declare namespace BlogArticleType {
  interface BlogArticle {
    id?: string;
    author: string;
    articleTitle: string;
    articleContent: string;
    articleTag: string[];
    cover: string;
    articleSummary: string;
    articleType: number;
    visibleRange: number;
    top: number;
    file?: any;
  }

  interface BlogArticleTop{
    id: string;
    top: number;
  }

  interface PageQuery {
    current?: number;
    pageSize?: number;
    articleTitle?: string;
    articleType?: string;
  }
}
