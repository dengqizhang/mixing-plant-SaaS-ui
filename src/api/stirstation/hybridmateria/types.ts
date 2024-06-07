export interface HybridmateriaVO {
  /**
   * 混合料表主键
   */
  id: string | number;

  /**
   * 混合料名称
   */
  hybridmateriaName: string | number;

}

export interface HybridmateriaForm extends BaseEntity {
  /**
   * 混合料表主键
   */
  id?: string | number;

  /**
   * 混合料名称
   */
  hybridmateriaName?: string | number;

}

export interface HybridmateriaQuery extends PageQuery {

  /**
   * 混合料名称
   */
  hybridmateriaName?: string | number;

    /**
     * 日期范围参数
     */
    params?: any;
}



