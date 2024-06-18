import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MixproportionVO, MixproportionForm, MixproportionQuery } from '@/api/stirstation/mixproportion/types';

/**
 * 查询生产配合比列表
 * @param query
 * @returns {*}
 */

export const listMixproportion = (query?: MixproportionQuery): AxiosPromise<MixproportionVO[]> => {
  return request({
    url: '/mixproportion/mixproportion/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询生产配合比详细
 * @param id
 */
export const getMixproportion = (id: string | number): AxiosPromise<MixproportionVO> => {
  return request({
    url: '/mixproportion/mixproportion/' + id,
    method: 'get'
  });
};

/**
 * 新增生产配合比
 * @param data
 */
export const addMixproportion = (data: MixproportionForm) => {
  return request({
    url: '/mixproportion/mixproportion',
    method: 'post',
    data: data
  });
};

/**
 * 修改生产配合比
 * @param data
 */
export const updateMixproportion = (data: MixproportionForm) => {
  return request({
    url: '/mixproportion/mixproportion',
    method: 'put',
    data: data
  });
};

/**
 * 删除生产配合比
 * @param id
 */
export const delMixproportion = (id: string | number | Array<string | number>) => {
  return request({
    url: '/mixproportion/mixproportion/' + id,
    method: 'delete'
  });
};
