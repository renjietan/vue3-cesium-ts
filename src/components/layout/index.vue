<template>
    <div class="container">
        <div class="container-navbar">
            <Navbar :defaultActive="defaultActive" :menu="d_mock" />
        </div>
        <div class="container-content">
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
import { convertToTree } from "@/utils";
const d_mock = ref<RouteNode[]>([])
const defaultActive = ref<string>('1-1-1-1')
let temp = AsyncRouters.map(item => {
    item.meta = {
        title: item.title
    }
    return item
})

d_mock.value = convertToTree(temp)

</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;

    &-navbar {
        width: 250px;
    }

    &-content {
        flex: 1;
        height: 100vh;
        overflow: hidden;
    }
}
</style>