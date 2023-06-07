export declare namespace BlogArticle {
  interface BlogArticle {
    id: string;
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
}
