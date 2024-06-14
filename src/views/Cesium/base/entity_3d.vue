<template>
    <div>
        <el-button @click="handleCorridor" type='primary'>添加点</el-button>
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

const handleCorridor = () => {
    let entityCorridor = new Cesium.Entity({
        name: 'entityCorridor0',
        position: Cesium.Cartesian3.fromDegrees(123.0, 43.0),
        corridor: {
            positions: Cesium.Cartesian3.fromDegreesArray([
                123.0, 40.0, 122.0, 40.0, 123.0, 42.0, 121.0, 42.0
            ]),
            width: 10000,
            material: new Cesium.ImageMaterialProperty({
                //可以设置贴图
                // image: 'static/image/corridor.png',
                color: Cesium.Color.YELLOWGREEN,
                repeat: new Cesium.Cartesian2(32, 32)
                // transparent: true
            }),
            extrudedHeight: 10000,
            outline: false
        }
    })
    map_store.viewer?.entities.add(entityCorridor)
    map_store.viewer?.zoomTo(entityCorridor)
}

const handleClear = () => {

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

</script>