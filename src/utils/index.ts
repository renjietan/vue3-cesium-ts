import { RouteNode } from "@/types/router";

type jsonType = {
    [key: string]: any
}

export function convertToTree(nodes: any[]) {
    const tree: any[] = [];
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

export function appendTreePath<T extends RouteNode>(nodes: T[], items:string[] = []) {
    nodes.forEach(node => {
        const _items = [...items]
        _items.push(node.path)
        node.nodePath = _items
        node.children && appendTreePath(node.children, node.nodePath)
    })
}

export function generateRandomColorWithAlpha(num = 3 , Alpha = 0.3) {
    const randomColor = {
        color_num: <{ [key: string]: string | number }[]>[],
        rgba: <string[]>[]
    }
    // 生成一个随机的红绿蓝(RGB)颜色值
    for (let index = 0; index < num; index++) {
        let red = Math.floor(Math.random() * 256); // 从00到FF
        let green = Math.floor(Math.random() * 256); // 从00到FF
        let blue = Math.floor(Math.random() * 256); // 从00到FF
        let rgbaColor = `rgba(${red}, ${green}, ${blue}, ${Alpha})`;
        randomColor.color_num.push({
            red,
            green,
            blue,
        })
        randomColor.rgba.push(rgbaColor)
    }
    return randomColor;
}
