import {RouteRecordName, RouteRecordRaw, createRouter,createWebHashHistory}  from "vue-router";
import asyncRouters from '@/mock/async_routers'
import { convertToTree } from "@/utils";
import viewComponents from "./viewComponents";
import { RouteNode } from "@/types/router";
const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: '/',
        name: 'home',
        component: viewComponents['empty'],
        redirect: '/Cesium/dyhf'
    }]
})

const addRoutes = function(nodes: RouteRecordRaw[], path: (RouteRecordName | undefined)[] = []) {
    nodes.forEach(item => {
        let _path = [...path]
        _path.push(item.name)
        let parentName = _path[_path.length - 2]
        if(parentName) {
            router.addRoute(parentName, item)
        } else {
            router.addRoute(item)
        }
        let children = item.children as RouteRecordRaw[]
        delete item.children
        item.children && addRoutes(children, _path)
    })
}

router.beforeEach((to,from, next) => {
    let temp:RouteNode[] = asyncRouters.map<RouteNode>(item => {
        return {
            id: item.id,
            parentId: item.parentId,
            name: item.name,
            path: item.path,
            meta: {
                title: item.title
            },
            component: viewComponents[item.component]
        }
    })
    let routers = convertToTree(temp) as unknown[] as RouteRecordRaw[]
    addRoutes(routers)
    next()
})

export default router