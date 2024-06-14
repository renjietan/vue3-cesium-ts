<template>
    <div class="container">
        <div class="container-navbar">
            <Navbar :defaultActive="defaultActive" :menu="d_mock" />
        </div>
        <div v-if="isCesium" class="container-content">
            <div id="cesiumContainer"></div>
            <router-view style="position: absolute; left: 10px; top: 10px;"  #default="{ Component }">
                <transition>
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
        <div v-else class="container-content">
            <router-view #default="{ Component }">
                <transition>
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Navbar from "@/components/layout/Navbar.vue";
import { RouteNode } from "@/types/router";
import AsyncRouters from '@/mock/async_routers'
import { appendTreePath, convertToTree } from "@/utils";
import { useRoute } from "vue-router";
import { useMapStore } from "@/store/map";
import { initCesium } from "@/utils/map";
const route = useRoute()
const map_store = useMapStore()
const d_mock = ref<RouteNode[]>([])
const defaultActive = ref<string>(route.path)
const isCesium = ref<boolean>(true)
watch(() => route.path, n => {
    defaultActive.value = n
    if (n.includes('/Cesium/')) {
        if (map_store.viewer == null) {
            initCesium()
        }
    } else {
        isCesium.value = false
        map_store.viewer?.destroy()
        map_store.viewer = null
    }
})
let temp = AsyncRouters.map(item => {
    item.meta = {
        title: item.title
    }
    return item
})
const menus = convertToTree(temp)
appendTreePath(menus)
d_mock.value = menus

</script>

<style lang="scss" scoped>
#cesiumContainer {
    width: 100%;
    height: 100%;
}

.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;

    &-navbar {
        width: 250px;
    }

    &-content {
        position: relative;
        flex: 1;
        height: 100vh;
        overflow: hidden;
    }
}
</style>