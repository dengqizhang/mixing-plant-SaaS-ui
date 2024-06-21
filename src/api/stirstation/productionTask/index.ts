import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { ProductionTaskVO, ProductionTaskForm, ProductionTaskQuery } from '@/api/productionTask/productionTask/types';

/**
 * 查询生产任务列表
 * @param query
 * @returns {*}
 */

export const listProductionTask = (query?: ProductionTaskQuery): AxiosPromise<ProductionTaskVO[]> => {
  return request({
    url: '/productionTask/productionTask/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询生产任务详细
 * @param id
 */
export const getProductionTask = (id: string | number): AxiosPromise<ProductionTaskVO> => {
  return request({
    url: '/productionTask/productionTask/' + id,
    method: 'get'
  });
};

/**
 * 新增生产任务
 * @param data
 */
export const addProductionTask = (data: ProductionTaskForm) => {
  return request({
    url: '/productionTask/productionTask',
    method: 'post',
    data: data
  });
};

/**
 * 修改生产任务
 * @param data
 */
export const updateProductionTask = (data: ProductionTaskForm) => {
  return request({
    url: '/productionTask/productionTask',
    method: 'put',
    data: data
  });
};

/**
 * 删除生产任务
 * @param id
 */
export const delProductionTask = (id: string | number | Array<string | number>) => {
  return request({
    url: '/productionTask/productionTask/' + id,
    method: 'delete'
  });
};

/**
 * 查询配合比列表
 */
export const mixproportionList = () => {
  return request({
    url: '/productionTask/productionTask/mixproportionList',
    method: 'get'
  });
};
