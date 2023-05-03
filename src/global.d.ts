/**
 * 返回封装
 */
interface BaseResponse<T> {
    code: number;
    data: T;
    message?: string;
  }
  
  /**
   * 分页信息
   */
  interface PageInfo<T> {
    current: number;
    size: number;
    total: number;
    records: T[];
  }
  