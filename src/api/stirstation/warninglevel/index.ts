import request from '@/utils/request';
import { AxiosPromise } from 'axios';
// import { MaterialsVO, MaterialsForm, MaterialsQuery } from '@/api/materials/materials/types';
/**
 * 获取对应预警级别的用户列表
 * @param id
 */
export const selectwarninglevelById = () => {
  return request({
    url: '/warninglevel/warninglevel/list',
    method: 'get'
  });
};
