<template>
  <div></div>
</template>

<script setup lang="ts">
import * as Cesium from 'cesium';
import { useMapStore } from "@/store/map.ts";

onMounted(async () => {
  const map_store = useMapStore()
  // https://geo.datav.aliyun.com/areas_v3/bound/440000_full.json
  Cesium.GeoJsonDataSource.load('/src/utils/geo_json/辽宁省.json', {
    stroke: Cesium.Color.fromCssColorString("#00fcff"),
    fill: Cesium.Color.fromCssColorString("#ffffff").withAlpha(0.3),
    strokeWidth: 3,
    markerSymbol: "?",
  }).then(res => {
    let entities = res.entities.values
    entities.forEach(item => {
      if (Cesium.defined(item.polygon)) {
        // 第一种方法
        item.polygon.material = new Cesium.ColorMaterialProperty(
          Cesium.Color.fromRandom({ alpha: 0.5 })
        )
        // 第二种方法 - 重构一个polygon
        // item.polygon = new Cesium.PolygonGraphics({
        //   hierarchy: item.polygon.hierarchy, // 使用Feature的边界线作为多边形的边界
        //   material: new Cesium.ColorMaterialProperty(Cesium.Color.fromRandom({ alpha: 0.3 })),
        //   perPositionHeight: true // 确保多边形填充正确
        // });
      }
    })
    map_store?.viewer?.dataSources.add(res)
  })
  // =========================================================
  
  map_store.viewer?.camera.flyTo({
    // 从以度为单位的经度和纬度值返回笛卡尔3位置。
    destination: Cesium.Cartesian3.fromDegrees(124.338543115, 40.1290228266, 40000),
    orientation: {
      // heading：默认方向为正北，正角度为向东旋转，即水平旋转，也叫偏航角。
      // pitch：默认角度为-90，即朝向地面，正角度在平面之上，负角度为平面下，即上下旋转，也叫俯仰角。
      // roll：默认旋转角度为0，左右旋转，正角度向右，负角度向左，也叫翻滚角
      heading: Cesium.Math.toRadians(0.0), // 正东，默认北
      pitch: Cesium.Math.toRadians(-90), // 向正下方看
      roll: 0.0, // 左右
    },
    duration: 3, // 飞行时间（s）
  })
  map_store.viewer
})

</script>