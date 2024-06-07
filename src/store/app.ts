import { defineStore } from 'pinia'
export const useAppStore = defineStore('mapStore', {
    // 相当于data
    state: ():t_app => {
        return {
            menu_collapse: true,
            cur_router: '',
        }
    },
    // 相当于计算属性
    getters: {
        GET_MENU_COLLAPSE(state) {
            return state.menu_collapse
        },
        GET_CUR_ROUTER: (state) => {
            return state.cur_router
        },
    },
    actions: {
        //异步action
        SET_MENU_COLLAPSE(v: boolean) {
            this.menu_collapse = v
        },
        SET_CUR_ROUTER(v: string) {
            this.cur_router = v
        }
    },
})