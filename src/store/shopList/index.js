import {
  getShopList,
  createShopList,
  editShopList,
  deleteShopList,
} from '@/api/shopList';

export default {
  namespaced: true,
  state: {
    shoplist: {
      results: [],
      count: 0,
    },
  },

  mutations: {
    SET_SHOP_LIST(state, shoplist) {
      state.shoplist = shoplist;
    },
  },
  actions: {
    async FETCH_SHOP_LIST({ commit }, params) {
      return new Promise((resolve, reject) => {
        getShopList(params)
          .then((res) => {
            commit('SET_SHOP_LIST', res.data);
            resolve(res.data);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    async ADD_SHOP_LIST({}, params) {
      return createShopList(params)
    },
    async EDIT_SHOP_LIST({}, params) {
      return editShopList(params)
    },
    async DELETE_SHOP_LIST({}, params) {
      return deleteShopList(params)
    }
  },
  getters: {
    SHOPLIST(state) {
      return state.shoplist;
    },
  },
};
