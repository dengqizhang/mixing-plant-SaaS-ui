import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { WarninglevelForm } from '@/api/materials/materials/types';
/**
 * 获取对应预警级别的用户列表
 * @param id
 */
export const selectwarninglevelById = (id: string | number) => {
  return request({
    url: '/warninglevel/warninglevel/' + id,
    method: 'get',
  });
};

/**
 * 修改对应预警级别的用户
 * @param WarninglevelForm
 */
export const updateWarninglevel = (warninglevelList: string,warninglevelId: number) => {
  return request({
    url: '/warninglevel/warninglevel/edit',
    method: 'post',
    data: {
      warninglevelList: warninglevelList,
      warninglevelId: warninglevelId,
    }
  });
};
/**
 * 获取用户列表
 * @param id
 */
export const selectUserList = () => {
  return request({
    url: '/warninglevel/warninglevel/list',
    method: 'get',
  });
};

