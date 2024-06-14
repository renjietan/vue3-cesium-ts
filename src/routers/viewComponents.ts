export default {
    'empty': () => import("@/views/pt/empty.vue"),
    'layout': () => import("@/components/layout/index.vue"),
    'dyhf': () => import('@/views/Cesium/merge/dyhf.vue'),
    'entity_2d': () => import('@/views/Cesium/base/entity_2d.vue'),
    'entity_3d': () => import('@/views/Cesium/base/entity_3d.vue')
} as {
    [key: string]: any
}