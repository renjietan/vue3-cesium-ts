import request from "./request";
import * as Cesium from 'cesium';
import { generateRandomColorWithAlpha } from ".";
import { useMapStore } from "@/store/map.ts";

export async function initCesium() {
    Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN
    const map_store = useMapStore()
    
    map_store.viewer = new Cesium.Viewer('cesiumContainer', {
        terrainProvider: await Cesium.createWorldTerrainAsync({
            requestVertexNormals: true,
            requestWaterMask: true
        }),
        selectionIndicator: false,
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
}

export async function loadGeoJson(url: string) {
    let geo_json = await request(url, 'get') as any
    geo_json = geo_json?.res?.features ?? []
    let colorArrs: string[] = generateRandomColorWithAlpha(geo_json.length).rgba
    const addDataToGlobe = (features: any) => {
        let instances = [];

        for (let i = 0; i < features.length; i++) {
            const curFeatures = features[i];
            for (let j = 0; j < curFeatures.geometry.coordinates.length; j++) {
                const polygonArray = curFeatures.geometry.coordinates[j]
                    .toString()
                    .split(",")
                    .map(Number);
                const polygon = new Cesium.PolygonGeometry({
                    polygonHierarchy: new Cesium.PolygonHierarchy(
                        Cesium.Cartesian3.fromDegreesArray(polygonArray)
                    ),
                    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
                    // 设置面的拉伸高度
                    extrudedHeight: 100,
                    // height: 100, // 多边形和椭球表面之间的距离（以米为单位）。
                });
                // console.log('---', polygon)
                // const polygonPositions = polygon.polygonHierarchy.getValue
                const geometry = Cesium.PolygonGeometry.createGeometry(polygon);
                instances.push(
                    new Cesium.GeometryInstance({
                        id: `polygon-${i}`,
                        geometry: geometry as Cesium.Geometry,
                        attributes: {
                            color: Cesium.Color.fromCssColorString(colorArrs[i]),
                            show: new Cesium.ShowGeometryInstanceAttribute(true),
                            // color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromRandom({ alpha: 0.7 })),
                        },
                    })
                );
            }

            // 寻找中心点位，添加标签
            // const p = pointRes.features.find(
            //     (item: any) => item.properties["ID"] == curFeatures["properties"]["id"]
            // );
            // const carter3Position = Cesium.Cartesian3.fromDegrees(
            //     ...p["geometry"]["coordinates"],
            //     1500
            // );
            // areaPointCenter.push(p["geometry"]["coordinates"]);
            // labelCollection.add({
            //     text: curFeatures["properties"]["name"],
            //     font: "bold 15px Microsoft YaHei",
            //     blendOption: Cesium.BlendOption.TRANSLUCENT, // 半透明，提高性能2倍
            //     position: carter3Position,
            //     // 竖直对齐方式
            //     verticalOrigin: Cesium.VerticalOrigin.CENTER,
            //     // 水平对齐方式
            //     horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
            // });
        }

        // 合并单个geometry,提高渲染效率
        const primitive = new Cesium.Primitive({
            releaseGeometryInstances: false,
            geometryInstances: instances,
            appearance: new Cesium.PerInstanceColorAppearance({
                translucent: true, // 当 true 时，几何体应该是半透明的，因此 PerInstanceColorAppearance#renderState 启用了 alpha 混合。
                closed: false, // 当 true 时，几何体应该是关闭的，因此 PerInstanceColorAppearance#renderState 启用了背面剔除。
            }),
            asynchronous: false,
        });
        return primitive
    };
    return addDataToGlobe(geo_json)
}