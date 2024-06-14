import { RouteNode } from "@/types/router";

export default [{
    id: '1',
    path: '/Cesium',
    name: 'Cesium',
    component: '',
    title: 'Cesium',
    redirect: '/Cesium/base/entity_2d',
},{
    id: '1-1',
    path: 'base',
    name: 'base',
    title: '基础',
    parentId: '1',
},{
    id: '1-1-1',
    path: 'entity_2d',
    name: 'entity_2d',
    component: 'entity_2d',
    title: '平面实体',
    parentId: '1-1',
},{
    id: '1-1-2',
    path: 'entity_3d',
    name: 'entity_3d',
    component: 'entity_3d',
    title: '3d实体',
    parentId: '1-1',
},{
    id: '1-2',
    path: 'merge',
    name: 'merge',
    title: '复杂的',
    parentId: '1',
},{
    id: '1-2-1',
    path: 'dyhf',
    name: 'dyhf',
    component: 'dyhf',
    title: '地域划分',
    parentId: '1-2',
},] as RouteNode[]
