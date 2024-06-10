import { RouteNode } from "@/types/router";

type jsonType = {
    [key: string]: any
}

export const convertToTree = function(nodes: any[]) {
    const tree:any[] = [];
    const children: jsonType = {};
    nodes.forEach(node => {
        children[node.id] = { ...node, children: [] };
    });

    function findParent(node: any) {
        return children[node.parentId] || null;
    }

    function build(node: any) {
        const parent = findParent(node);
        if (parent) {
            parent.children.push(node);
        } else {
            tree.push(node);
        }
    }

    nodes.forEach(node => build(children[node.id]));
    return tree;
}