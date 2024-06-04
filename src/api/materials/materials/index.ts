import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MaterialsVO, MaterialsForm, MaterialsQuery } from '@/api/materials/materials/types';

/**
 * 查询材料管理列表
 * @param query
 * @returns {*}
 */

export const listMaterials = (query?: MaterialsQuery): AxiosPromise<MaterialsVO[]> => {
  return request({
    url: '/materials/materials/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询材料管理详细
 * @param id
 */
export const getMaterials = (id: string | number): AxiosPromise<MaterialsVO> => {
  return request({
    url: '/materials/materials/' + id,
    method: 'get'
  });
};

/**
 * 新增材料管理
 * @param data
 */
export const addMaterials = (data: MaterialsForm) => {
  return request({
    url: '/materials/materials',
    method: 'post',
    data: data
  });
};

/**
 * 修改材料管理
 * @param data
 */
export const updateMaterials = (data: MaterialsForm) => {
  return request({
    url: '/materials/materials',
    method: 'put',
    data: data
  });
};

/**
 * 删除材料管理
 * @param id
 */
export const delMaterials = (id: string | number | Array<string | number>) => {
  return request({
    url: '/materials/materials/' + id,
    method: 'delete'
  });
};
