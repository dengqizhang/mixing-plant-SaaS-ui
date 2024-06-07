export interface FacilityVO {
  /**
   * 设备表主键
   */
  id: string | number;

  /**
   * 设备编号
   */
  facilityCode: string;

  /**
   * 设备名称
   */
  facilityName: string;

  /**
   * 设备规格
   */
  facilitySpecification: string;

  /**
   * 设备标识
   */
  facilityIdentifier: string | number;

}

export interface FacilityForm extends BaseEntity {
  /**
   * 设备表主键
   */
  id?: string | number;

  /**
   * 设备编号
   */
  facilityCode?: string;

  /**
   * 设备名称
   */
  facilityName?: string;

  /**
   * 设备规格
   */
  facilitySpecification?: string;

  /**
   * 设备标识
   */
  facilityIdentifier?: string | number;

}

export interface FacilityQuery extends PageQuery {

  /**
   * 设备编号
   */
  facilityCode?: string;

  /**
   * 设备名称
   */
  facilityName?: string;

  /**
   * 设备规格
   */
  facilitySpecification?: string;

  /**
   * 设备标识
   */
  facilityIdentifier?: string | number;

    /**
     * 日期范围参数
     */
    params?: any;
}



