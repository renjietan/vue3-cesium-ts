import { defineStore } from 'pinia'
export const useMapStore = defineStore('mapStore', {
    // 相当于data
    state: () => {
        return {
            viewer: <any>null,
        }
    },
    // 相当于计算属性
    getters: {
        GET_VIEWER: (state) => {
            return state.viewer
        },
    },
    actions: {
        //异步action
        SET_VIEWER(v: any) {
            this.viewer = v
        }
    },
})