<template>
    <div>
        <el-button @click="handleAddPoint" type='primary'>添加点</el-button>
        <el-button @click="handleAddMarker" type='primary'>添加Mark(图片)</el-button>
        <el-button @click="handleAddLine" type='primary'>添加线</el-button>
        <el-button @click="handleAddPolygon" type='primary'>添加面</el-button>
        <el-dropdown style="margin-left: 10px;" @command="handleClear">
            <el-button type="primary">
                {{ data.curAction }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="item in data.clear_actions" :command="item.action">{{ item.name
                    }}</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts" setup>
import { useMapStore } from '@/store/map';
import * as Cesium from 'cesium';
const data = reactive({
    clear_actions: [{
        name: '全部清除',
        action: 'clear-all'
    }, {
        name: '清除点位',
        action: 'clear-point'
    }, {
        name: '清除图片',
        action: 'clear-point'
    }] as { name: string, action: string }[],
    points: [] as (Cesium.Entity | undefined)[],
    curAction: '请选择',
})
const base_point = [100, 34, -30]
const map_store = useMapStore()


const handleAddPoint = () => {
    math_xy()
    const entity = new Cesium.Entity({
        name: `点位${data.points.length + 1}`,
        position: Cesium.Cartesian3.fromDegrees(base_point[0], base_point[1], base_point[2]),
        label: {
            // 文本。支持显式换行符“ \ n”
            text: `点位${data.points.length + 1}`,
            // 字体样式，以CSS语法指定字体
            font: '12pt',
            // 字体颜色
            fillColor: Cesium.Color.WHITE,
            // 背景颜色
            backgroundColor: Cesium.Color.RED,
            // 是否显示背景颜色
            showBackground: true,
            // 字体边框颜色
            outlineColor: Cesium.Color.WHITE,
            // 字体边框尺寸
            outlineWidth: 10,
            // 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。
            scale: 1.0,
            // 设置样式：FILL：填写标签的文本，但不要勾勒轮廓；OUTLINE：概述标签的文本，但不要填写；FILL_AND_OUTLINE：填写并概述标签文本。
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            // 相对于坐标的水平位置
            verticalOrigin: Cesium.VerticalOrigin.CENTER,
            // 相对于坐标的水平位置
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
            pixelOffset: new Cesium.Cartesian3(0, -40, 0),
            // 显示在距相机的距离处的属性，多少区间内是可以显示的
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 150000000000000),
            // 是否显示
            show: true
        },
        point: {
            // 点的大小（像素）
            pixelSize: 20,
            // 点位颜色，fromCssColorString 可以直接使用CSS颜色
            color: Cesium.Color.fromCssColorString('#ee0000'),
            // 边框颜色
            outlineColor: Cesium.Color.fromCssColorString('#fff'),
            // 边框宽度(像素)
            outlineWidth: 3,
            // 显示在距相机的距离处的属性，多少区间内是可以显示的
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 15000000000000000),
            // 是否显示
            show: true
        }
    })
    let point = map_store.viewer?.entities.add(entity) as Cesium.Entity
    data.points.push(point)
    map_store.viewer?.zoomTo(entity)
}

const handleAddMarker = () => {
    math_xy()
    const entity = new Cesium.Entity({
        name: `点位${data.points.length + 1}`,
        position: Cesium.Cartesian3.fromDegrees(base_point[0], base_point[1], base_point[2]),
        label: {
            //文字标签
            text: `点位${data.points.length + 1}`,
            font: '10pt',
            fillColor: Cesium.Color.GRAY,
            outlineColor: Cesium.Color.BLACK,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            showBackground: true,
            backgroundColor: new Cesium.Color(1, 1, 1, 0.5),
            backgroundPadding: new Cesium.Cartesian2(10, 5),
            verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直方向以底部来计算标签的位置
            pixelOffset: new Cesium.Cartesian2(10, -40), //偏移量
        },
        billboard: {
            // 图像地址，URI或Canvas的属性
            image: '/src/assets/map/gaj_blue.png',
            // 设置颜色和透明度
            color: Cesium.Color.WHITE.withAlpha(0.8),
            // 高度（以像素为单位）
            height: 40,
            // 宽度（以像素为单位）
            width: 35,
            // 逆时针旋转
            rotation: 0,
            // 大小是否以米为单位
            sizeInMeters: false,
            // 相对于坐标的垂直位置
            verticalOrigin: Cesium.VerticalOrigin.CENTER,
            // 相对于坐标的水平位置
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
            pixelOffset: new Cesium.Cartesian2(10, 0),
            // 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。
            scale: 1.0,
            // 显示在距相机的距离处的属性，多少区间内是可以显示的
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1000000000000000000),
            // 是否显示
            show: true
        }
    })
    let marker = map_store.viewer?.entities.add(entity) as Cesium.Entity
    data.points.push(marker)
    map_store.viewer?.zoomTo(entity)
}
const handleAddLine = () => {
    let xyz = data.points.map(item => {
        let temp = item?.position?.getValue(map_store.viewer?.clock.currentTime as Cesium.JulianDate);
        return temp
    }) as Cesium.Cartesian3[]
    const entity = new Cesium.Entity({
        name: "polyline",
        polyline: {
            show: true, //是否显示，默认显示
            positions: xyz,
            width: 2, //线的宽度（像素），默认为1
            granularity: Cesium.Math.RADIANS_PER_DEGREE,
            material: Cesium.Color.BLUE, //线的颜色，默认为白色
            // depthFailMaterial: Cesium.Color.RED, //线被遮挡部分的颜色，默认为空（不显示被遮挡的部分），设置后可显示被遮挡的部分
            arcType: Cesium.ArcType.NONE, //线的地理类型，NONE表示纯直线，GEODESIC表示为测地线，RHUMB表示等角航线，默认为测地线
            // arcType: Cesium.ArcType.GEODESIC,
            // arcType: Cesium.ArcType.RHUMB,
            // clampToGround: false, //是否贴地，默认为否
            shadows: Cesium.ShadowMode.ENABLED, //是否显示光照阴影，默认为否
            // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(100.0, 2000000.0), //显示的视角距离条件，在该范围内显示，范围不显示，默认为空
            classificationType: Cesium.ClassificationType.BOTH,
            zIndex: 0, //显示深度，越大表示图层在上
        }
    })
    map_store.viewer?.entities.add(entity);
    map_store.viewer?.zoomTo(entity)
}

const handleAddPolygon = () => {
    let xyz = data.points.map(item => {
        let temp = item?.position?.getValue(map_store.viewer?.clock.currentTime as Cesium.JulianDate);
        return temp
    }) as Cesium.Cartesian3[]
    const entity = new Cesium.Entity({
        polygon: {
            // 获取指定属性（positions，holes（图形内需要挖空的区域））
            hierarchy: {
                positions: xyz,
                holes: [
                    {
                        positions: Cesium.Cartesian3.fromDegreesArrayHeights(Array.from({length: xyz.length * 3}).map(item => 0))
                    }
                ]
            },
            // 边框
            outline: true,
            // 边框颜色
            outlineColor: Cesium.Color.WHITE,
            // 边框尺寸
            outlineWidth: 2,
            // 填充的颜色，withAlpha透明度
            material: Cesium.Color.GREEN.withAlpha(0.5),
            // 是否被提供的材质填充
            fill: true,
            // 恒定高度
            height: 5000,
            // 显示在距相机的距离处的属性，多少区间内是可以显示的
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000, 10000000),
            // 是否显示
            show: true,
            // 顺序,仅当`clampToGround`为true并且支持地形上的折线时才有效。
            zIndex: 10
        }
    })
    map_store.viewer?.entities.add(entity) as Cesium.Entity
    map_store.viewer?.zoomTo(entity)
}

const handleClear = (v: string) => {
    data.curAction = data.clear_actions.filter(item => item.action == v)?.[0]?.name
    switch (v) {
        case 'clear-all':
            map_store.viewer?.entities.removeAll()
            data.points = []
            break;

        default:
            break;
    }

}


const math_xy = () => {
    const random = Math.random()
    if (random > 0.5) {
        base_point[0] = base_point[0] + 1
    } else {
        base_point[1] = base_point[1] + 1
    }
    return random > 0.5
}
const flyTo = () => {
    map_store.viewer?.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(base_point[0], base_point[1], 1000000),
        orientation: {
            heading: Cesium.Math.toRadians(348.4202942851978),
            pitch: Cesium.Math.toRadians(-89.74026687972041),
            roll: Cesium.Math.toRadians(0)
        },
        duration: 3, // 飞行时间（s）
    })
}

onMounted(() => {
    flyTo()
})

onUnmounted(() => {
    handleClear('clear-all')
})

</script>