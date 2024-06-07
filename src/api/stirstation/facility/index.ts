import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { FacilityVO, FacilityForm, FacilityQuery } from '@/api/stirstation/facility/types';

/**
 * 查询设备管理列表
 * @param query
 * @returns {*}
 */

export const listFacility = (query?: FacilityQuery): AxiosPromise<FacilityVO[]> => {
  return request({
    url: '/facility/facility/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询设备管理详细
 * @param id
 */
export const getFacility = (id: string | number): AxiosPromise<FacilityVO> => {
  return request({
    url: '/facility/facility/' + id,
    method: 'get'
  });
};

/**
 * 新增设备管理
 * @param data
 */
export const addFacility = (data: FacilityForm) => {
  return request({
    url: '/facility/facility',
    method: 'post',
    data: data
  });
};

/**
 * 修改设备管理
 * @param data
 */
export const updateFacility = (data: FacilityForm) => {
  return request({
    url: '/facility/facility',
    method: 'put',
    data: data
  });
};

/**
 * 删除设备管理
 * @param id
 */
export const delFacility = (id: string | number | Array<string | number>) => {
  return request({
    url: '/facility/facility/' + id,
    method: 'delete'
  });
};
