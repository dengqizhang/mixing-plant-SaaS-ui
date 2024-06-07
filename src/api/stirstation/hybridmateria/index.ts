import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { HybridmateriaVO, HybridmateriaForm, HybridmateriaQuery } from '@/api/hybridmateria/hybridmateria/types';

/**
 * 查询混合料管理列表
 * @param query
 * @returns {*}
 */

export const listHybridmateria = (query?: HybridmateriaQuery): AxiosPromise<HybridmateriaVO[]> => {
  return request({
    url: '/hybridmateria/hybridmateria/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询混合料管理详细
 * @param id
 */
export const getHybridmateria = (id: string | number): AxiosPromise<HybridmateriaVO> => {
  return request({
    url: '/hybridmateria/hybridmateria/' + id,
    method: 'get'
  });
};

/**
 * 新增混合料管理
 * @param data
 */
export const addHybridmateria = (data: HybridmateriaForm) => {
  return request({
    url: '/hybridmateria/hybridmateria',
    method: 'post',
    data: data
  });
};

/**
 * 修改混合料管理
 * @param data
 */
export const updateHybridmateria = (data: HybridmateriaForm) => {
  return request({
    url: '/hybridmateria/hybridmateria',
    method: 'put',
    data: data
  });
};

/**
 * 删除混合料管理
 * @param id
 */
export const delHybridmateria = (id: string | number | Array<string | number>) => {
  return request({
    url: '/hybridmateria/hybridmateria/' + id,
    method: 'delete'
  });
};
