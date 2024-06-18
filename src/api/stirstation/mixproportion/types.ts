export interface MixproportionVO {
  /**
   * 生产配合比表主键
   */
  id: string | number;

  /**
   * 配合比名称
   */
  mixproportionName: string;

  /**
   * 混合料名称
   */
  hybridmateriaName: string | number;

  /**
   * 施工部位
   */
  constructionAddress: string;

  /**
   * 设备
   */
  facility: string;

  /**
   * 胶凝1仓材料
   */
  jnMaterialsOne: string;

  /**
   * 胶凝1仓重量
   */
  jnWeightOne: number;

  /**
   * 胶凝2仓材料
   */
  jnMaterialsTwo: string;

  /**
   * 胶凝2仓重量
   */
  jnWeightTwo: number;

  /**
   * 胶凝3仓材料
   */
  jnMaterialsThree: string;

  /**
   * 胶凝3仓重量
   */
  jnWeightThree: number;

  /**
   * 胶凝4仓材料
   */
  jnMaterialsFour: string;

  /**
   * 胶凝4仓重量
   */
  jnWeightFour: number;

  /**
   * 胶凝5仓材料
   */
  jnMaterialsFive: string;

  /**
   * 胶凝5仓重量
   */
  jnWeightFive: number;

  /**
   * 胶凝6仓材料
   */
  jnMaterialsSix: string;

  /**
   * 胶凝6仓重量
   */
  jnWeightSix: number;

  /**
   * 胶凝7仓材料
   */
  jnMaterialsSeven: string;

  /**
   * 胶凝7仓重量
   */
  jnWeightSeven: number;

  /**
   * 胶凝8仓材料
   */
  jnMaterialsEight: string;

  /**
   * 胶凝8仓重量
   */
  jnWeightEight: number;

  /**
   * 骨料1仓材料
   */
  glMaterialsOne: string;

  /**
   * 骨料1仓重量
   */
  glWeightOne: number;

  /**
   * 骨料2仓材料
   */
  glMaterialsTwo: string;

  /**
   * 骨料2仓重量
   */
  glWeightTwo: number;

  /**
   * 骨料3仓材料
   */
  glMaterialsThree: string;

  /**
   * 骨料3仓重量
   */
  glWeightThree: number;

  /**
   * 骨料4仓材料
   */
  glMaterialsFour: string;

  /**
   * 骨料4仓重量
   */
  glWeightFour: number;

  /**
   * 骨料5仓材料
   */
  glMaterialsFive: string;

  /**
   * 骨料5仓重量
   */
  glWeightFive: number;

  /**
   * 骨料6仓材料
   */
  glMaterialsSix: string;

  /**
   * 骨料6仓重量
   */
  glWeightSix: number;

  /**
   * 外加剂1仓材料
   */
  wjjMaterialsOne: string;

  /**
   * 外加剂1仓重量
   */
  wjjWeightOne: number;

  /**
   * 外加剂2仓材料
   */
  wjjMaterialsTwo: string;

  /**
   * 外加剂2仓重量
   */
  wjjWeightTwo: number;

  /**
   * 水1仓材料
   */
  waterMaterialsOne: string;

  /**
   * 水1仓重量
   */
  waterWeightOne: number;

  /**
   * 水2仓材料
   */
  waterMaterialsTwo: string;
  /**
   * 水2仓重量
   */
  waterWeightTwo: number;
}

export interface MixproportionForm extends BaseEntity {
  /**
   * 生产配合比表主键
   */
  id?: string | number;

  /**
   * 配合比名称
   */
  mixproportionName?: string;

  /**
   * 混合料名称
   */
  hybridmateriaName?: string | number;

  /**
   * 施工部位
   */
  constructionAddress?: string;

  /**
   * 设备
   */
  facility?: string;

  /**
   * 胶凝1仓材料
   */
  jnMaterialsOne?: string;

  /**
   * 胶凝1仓重量
   */
  jnWeightOne?: number;

  /**
   * 胶凝2仓材料
   */
  jnMaterialsTwo?: string;

  /**
   * 胶凝2仓重量
   */
  jnWeightTwo?: number;

  /**
   * 胶凝3仓材料
   */
  jnMaterialsThree?: string;

  /**
   * 胶凝3仓重量
   */
  jnWeightThree?: number;

  /**
   * 胶凝4仓材料
   */
  jnMaterialsFour?: string;

  /**
   * 胶凝4仓重量
   */
  jnWeightFour?: number;

  /**
   * 胶凝5仓材料
   */
  jnMaterialsFive?: string;

  /**
   * 胶凝5仓重量
   */
  jnWeightFive?: number;

  /**
   * 胶凝6仓材料
   */
  jnMaterialsSix?: string;

  /**
   * 胶凝6仓重量
   */
  jnWeightSix?: number;

  /**
   * 胶凝7仓材料
   */
  jnMaterialsSeven?: string;

  /**
   * 胶凝7仓重量
   */
  jnWeightSeven?: number;

  /**
   * 胶凝8仓材料
   */
  jnMaterialsEight?: string;

  /**
   * 胶凝8仓重量
   */
  jnWeightEight?: number;

  /**
   * 骨料1仓材料
   */
  glMaterialsOne?: string;

  /**
   * 骨料1仓重量
   */
  glWeightOne?: number;

  /**
   * 骨料2仓材料
   */
  glMaterialsTwo?: string;

  /**
   * 骨料2仓重量
   */
  glWeightTwo?: number;

  /**
   * 骨料3仓材料
   */
  glMaterialsThree?: string;

  /**
   * 骨料3仓重量
   */
  glWeightThree?: number;

  /**
   * 骨料4仓材料
   */
  glMaterialsFour?: string;

  /**
   * 骨料4仓重量
   */
  glWeightFour?: number;

  /**
   * 骨料5仓材料
   */
  glMaterialsFive?: string;

  /**
   * 骨料5仓重量
   */
  glWeightFive?: number;

  /**
   * 骨料6仓材料
   */
  glMaterialsSix?: string;

  /**
   * 骨料6仓重量
   */
  glWeightSix?: number;

  /**
   * 外加剂1仓材料
   */
  wjjMaterialsOne?: string;

  /**
   * 外加剂1仓重量
   */
  wjjWeightOne?: number;

  /**
   * 外加剂2仓材料
   */
  wjjMaterialsTwo?: string;

  /**
   * 外加剂2仓重量
   */
  wjjWeightTwo?: number;

  /**
   * 水1仓材料
   */
  waterMaterialsOne?: string;

  /**
   * 水1仓重量
   */
  waterWeightOne?: number;

  /**
   * 水2仓材料
   */
  waterMaterialsTwo?: string;

  /**
   * 水2仓重量
   */
  waterWeightTwo?: number;
}

export interface MixproportionQuery extends PageQuery {
  /**
   * 配合比名称
   */
  mixproportionName?: string;

  /**
   * 混合料名称
   */
  hybridmateriaName?: string | number;

  /**
   * 施工部位
   */
  constructionAddress?: string;

  /**
   * 设备
   */
  facility?: string;

  /**
   * 胶凝1仓材料
   */
  jnMaterialsOne?: string;

  /**
   * 胶凝1仓重量
   */
  jnWeightOne?: number;

  /**
   * 胶凝2仓材料
   */
  jnMaterialsTwo?: string;

  /**
   * 胶凝2仓重量
   */
  jnWeightTwo?: number;

  /**
   * 胶凝3仓材料
   */
  jnMaterialsThree?: string;

  /**
   * 胶凝3仓重量
   */
  jnWeightThree?: number;

  /**
   * 胶凝4仓材料
   */
  jnMaterialsFour?: string;

  /**
   * 胶凝4仓重量
   */
  jnWeightFour?: number;

  /**
   * 胶凝5仓材料
   */
  jnMaterialsFive?: string;

  /**
   * 胶凝5仓重量
   */
  jnWeightFive?: number;

  /**
   * 胶凝6仓材料
   */
  jnMaterialsSix?: string;

  /**
   * 胶凝6仓重量
   */
  jnWeightSix?: number;

  /**
   * 胶凝7仓材料
   */
  jnMaterialsSeven?: string;

  /**
   * 胶凝7仓重量
   */
  jnWeightSeven?: number;

  /**
   * 胶凝8仓材料
   */
  jnMaterialsEight?: string;

  /**
   * 胶凝8仓重量
   */
  jnWeightEight?: number;

  /**
   * 骨料1仓材料
   */
  glMaterialsOne?: string;

  /**
   * 骨料1仓重量
   */
  glWeightOne?: number;

  /**
   * 骨料2仓材料
   */
  glMaterialsTwo?: string;

  /**
   * 骨料2仓重量
   */
  glWeightTwo?: number;

  /**
   * 骨料3仓材料
   */
  glMaterialsThree?: string;

  /**
   * 骨料3仓重量
   */
  glWeightThree?: number;

  /**
   * 骨料4仓材料
   */
  glMaterialsFour?: string;

  /**
   * 骨料4仓重量
   */
  glWeightFour?: number;

  /**
   * 骨料5仓材料
   */
  glMaterialsFive?: string;

  /**
   * 骨料5仓重量
   */
  glWeightFive?: number;

  /**
   * 骨料6仓材料
   */
  glMaterialsSix?: string;

  /**
   * 骨料6仓重量
   */
  glWeightSix?: number;

  /**
   * 外加剂1仓材料
   */
  wjjMaterialsOne?: string;

  /**
   * 外加剂1仓重量
   */
  wjjWeightOne?: number;

  /**
   * 外加剂2仓材料
   */
  wjjMaterialsTwo?: string;

  /**
   * 外加剂2仓重量
   */
  wjjWeightTwo?: number;

  /**
   * 水1仓材料
   */
  waterMaterialsOne?: string;

  /**
   * 水1仓重量
   */
  waterWeightOne?: number;

  /**
   * 水2仓材料
   */
  waterMaterialsTwo?: string;

  /**
   * 水2仓重量
   */
  waterWeightTwo?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}

