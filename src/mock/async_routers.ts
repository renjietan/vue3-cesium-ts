import { RouteNode } from "@/types/router";

export default [{
    id: '1',
    path: '/Cesium',
    name: 'Cesium',
    component: '',
    title: '地域划分',
    redirect: '/Cesium/dyhf',
},{
    id: '1-1',
    path: 'base',
    name: 'base',
    title: '基础',
    parentId: '1',
},{
    id: '1-1-1',
    path: 'dyhf',
    name: 'dyhf',
    component: 'dyhf',
    title: '地域划分',
    parentId: '1-1',
},] as RouteNode[]
