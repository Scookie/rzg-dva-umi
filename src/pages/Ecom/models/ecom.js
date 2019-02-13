import { getFakePlanData,createPlan,deletePlan } from '@/services/api';

export default {
  namespace: 'ecom',

  state: {
    planData: {data:[],total:0},
  },

  effects: {
    /**
     * 计划列表
     * @param payload {Objact} 参数 
     * @param callback {Function} 回调函数 
     */
    *fetchPlan({payload,callback}, { call, put }) {
      const response = yield call(getFakePlanData,payload);
      yield put({
        type: 'savePlan',
        payload: response,
      });
    },
    *fetchPlanAndCallback({payload,callback}, { call, put }) {
      const response = yield call(getFakePlanData);
      callback && callback(response);
    },
    /**
     * 创建xxxx
     * @param payload {Objact} 参数{zhwchm:"",gq:"",remark:"非必填"} 
     * @param callback {Function} 回调函数 
     */
    *create({payload,callback}, { call }) {
      const response = yield call(createPlan,payload);
      callback && callback(response);
    },
    /**
     * 编辑xxxx
     * @param payload {Objact} 参数{id:number,zhwchm:"",gq:"",remark:"非必填"} 
     * @param callback {Function} 回调函数 
     */
    *update({payload,callback}, { call }) {
      const response = yield call(createPlan,payload);
      callback && callback(response);
    },
    /**
     * 删除xxxx
     * @param payload {Objact} 参数{id:number} 
     * @param callback {Function} 回调函数 
     */
    *delete({payload,callback}, { call }) {
      const response = yield call(deletePlan,payload);
      callback && callback(response);
    },
  },

  reducers: {
    savePlan(state, { payload }) {
      return {
        ...state,
        planData: payload,
      };
    },
  }
}