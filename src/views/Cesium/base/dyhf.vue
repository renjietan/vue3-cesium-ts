<template>
  <div id="cesiumContainer"></div>
</template>

<script setup lang="ts">
import * as Cesium from 'cesium';
import { useMapStore } from "@/store/map.ts";
onMounted(async () => {
  const map_store = useMapStore()
  map_store.viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: await Cesium.createWorldTerrainAsync({
      requestVertexNormals: true,
      requestWaterMask: true
    }),
    geocoder: false,//地理位置查询定位控件，默认使用bing地图服务.
    homeButton: false,//默认相机位置。
    sceneModePicker: false,//3D、2D和哥伦布模式的切换按钮.
    baseLayerPicker: false,//选择地形、影像等图层。
    navigationHelpButton: false,//显示默认的相机控制提示.
    animation: false,//控制场景动画的播放速度.
    // creditContainer: "credit",//展示数据版权属性。
    timeline: false,//时间滚动条。
    fullscreenButton: false,//全屏切换。
    orderIndependentTranslucency: false,
    contextOptions: {
      webgl: {
        alpha: true
      }
    }
  })
  map_store.viewer.cesiumWidget.creditContainer.setAttribute('style', 'display:none')

  map_store.viewer.camera.flyTo({
    // 从以度为单位的经度和纬度值返回笛卡尔3位置。
    destination: Cesium.Cartesian3.fromDegrees(120.36, 36.09, 40000),
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
  // map_store.viewer.imageryLayers.removeAll(true); //删除所有底图 
  // map_store.viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString("#7f7f7f");
  // map_store.viewer.backgroundColor = new Cesium.Color(0,0,0,0)
  // map_store.viewer.skyBox.show = false
})
</script>



<style lang="scss">
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>