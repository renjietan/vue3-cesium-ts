export interface RouteNode {
    id: string;
    path: string;
    name: string;
    component: string;
    parentId?: string;
    redirect?: string,
    children?: RouteNode[];
    title?: string,
    meta?: {
        title?: string
    },
    [key: string]: any
}