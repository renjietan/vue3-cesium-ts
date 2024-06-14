import { defineStore } from 'pinia'
import * as Cesium from 'cesium';
export const useMapStore = defineStore('mapStore', {
    // 相当于data
    state: () => {
        return {
            viewer: <Cesium.Viewer | null>null,
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