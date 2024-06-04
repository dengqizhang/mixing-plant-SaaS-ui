export interface MaterialsVO {
  /**
   * 材料表id
   */
  id: string | number;

  /**
   * 材料类型
   */
  materialsType: string;

  /**
   * 材料名称
   */
  materialsName: string;

  /**
   * 规格型号
   */
  specificationType: string;

  /**
   * 用途
   */
  purpose: string;

}

export interface MaterialsForm extends BaseEntity {
  /**
   * 材料表id
   */
  id?: string | number;

  /**
   * 材料类型
   */
  materialsType?: string;

  /**
   * 材料名称
   */
  materialsName?: string;

  /**
   * 规格型号
   */
  specificationType?: string;

  /**
   * 用途
   */
  purpose?: string;

}

export interface MaterialsQuery extends PageQuery {

  /**
   * 材料类型
   */
  materialsType?: string;

  /**
   * 材料名称
   */
  materialsName?: string;

  /**
   * 规格型号
   */
  specificationType?: string;

  /**
   * 用途
   */
  purpose?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



