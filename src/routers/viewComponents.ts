export default {
    'empty': () => require("@/views/noPermission/empty.vue"),
    'layout': () => require("@/components/layout/index.vue"),
    'dyhf': () => require('@/views/Cesium/dyhf.vue')
} as {
    [key: string]: any
}