import { RouteNode } from "@/types/router";

export default [{
    id: '1',
    path: '/Cesium',
    name: 'Cesium',
    component: 'layout',
    title: '地域划分',
    redirect: '/Cesium/dyhf',
},{
    id: '1-1',
    path: '/Cesium/dyhf',
    name: 'dyhf',
    component: 'dyhf',
    title: '地域划分',
    parentId: '1',
}] as RouteNode[]
