export default {
    'empty': () => import("@/views/noPermission/empty.vue"),
    'layout': () => import("@/components/layout/index.vue"),
    'dyhf': () => import('@/views/Cesium/dyhf.vue')
} as {
    [key: string]: any
}