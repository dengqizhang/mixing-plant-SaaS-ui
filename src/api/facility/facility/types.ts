export interface FacilityVO {
  /**
   * 设备表主键
   */
  id: string | number;

  /**
   * 设备编号
   */
  facility
Code: string;

  /**
   * 设备名称
   */
  facility
Name: string;

  /**
   * 设备规格
   */
  facility
Specification: string;

  /**
   * 设备标识
   */
  facility
Identifier: string | number;

}

export interface FacilityForm extends BaseEntity {
  /**
   * 设备表主键
   */
  id?: string | number;

  /**
   * 设备编号
   */
  facility
Code?: string;

  /**
   * 设备名称
   */
  facility
Name?: string;

  /**
   * 设备规格
   */
  facility
Specification?: string;

  /**
   * 设备标识
   */
  facility
Identifier?: string | number;

}

export interface FacilityQuery extends PageQuery {

  /**
   * 设备编号
   */
  facility
Code?: string;

  /**
   * 设备名称
   */
  facility
Name?: string;

  /**
   * 设备规格
   */
  facility
Specification?: string;

  /**
   * 设备标识
   */
  facility
Identifier?: string | number;

    /**
     * 日期范围参数
     */
    params?: any;
}



