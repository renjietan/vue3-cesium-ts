import viewComponents from "@/routers/viewComponents";
import { RouteNode } from "@/types/router";

export const convertToTree = function (list: any[]): RouteNode[] {
    const map = new Map<string, RouteNode>();
    const result: RouteNode[] = [];

    // 创建map以便于通过parentId查找节点
    list.forEach(item => {
        map.set(item.id, {
            ...item,
            children: [] // 初始化children数组
        });
    });

    // 构建树状结构
    list.forEach(item => {
        const node = map.get(item.id);
        if (node) {
            // 如果存在parentId，则将当前节点添加到父节点的children中
            if (item.parentId) {
                const parent = map.get(item.parentId);
                if (parent) {
                    parent.children && parent.children.push(node);
                }
            } else {
                // 如果没有parentId，则直接添加到结果数组中
                result.push(node);
            }
        }
    });

    return result;
}