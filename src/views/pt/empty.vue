<template>
    <div style="width: 100%; height: 100%">
        <router-view #default="{ Component }">
            <transition>
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>