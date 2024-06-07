import { Component } from "vue"
import { RouteRecordRaw } from "vue-router"
interface RouteNode {
    id: string;
    path: string;
    name: string;
    component: string;
    parentId?: string;
    redirect?: string,
    children?: RouteNode[];
    title?: string
    meta?: {
        title?: string
    }
}