export default {
    'empty': () => import("@/views/pt/empty.vue"),
    'layout': () => import("@/components/layout/index.vue"),
    'dyhf': () => import('@/views/Cesium/base/dyhf.vue'),
    'test': () => import('@/views/Cesium/base/test.vue')
} as {
    [key: string]: any
}