export interface ProductionTaskVO {
  /**
   * 生产任务表主键
   */
  id: string | number;

  /**
   * 生产任务名称
   */
  taskName: string;

  /**
   * 开始时间
   */
  startTime: string;

  /**
   * 生产配合比
   */
  productionMixproportion: string;

  /**
   * 任务状态
   */
  taskType: number;
}

export interface ProductionTaskForm extends BaseEntity {
  /**
   * 生产任务表主键
   */
  id?: string | number;

  /**
   * 生产任务名称
   */
  taskName?: string;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 生产配合比
   */
  productionMixproportion?: string;

  /**
   * 任务状态
   */
  taskType?: number;
  /**
   * 结束时间
   */
  endTime: string;
}

export interface ProductionTaskQuery extends PageQuery {
  /**
   * 生产任务名称
   */
  taskName?: string;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 生产配合比
   */
  productionMixproportion?: string;

  /**
   * 任务状态
   */
  taskType?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}
