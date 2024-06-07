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
  })
  map_store.viewer.cesiumWidget.creditContainer.setAttribute('style', 'display:none')
})
</script>



<style lang="scss">
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>