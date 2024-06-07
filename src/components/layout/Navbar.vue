
<template>
  <el-menu popper-effect="dark" v-model="active" :unique-opened="true">
    <template v-for="item in menu">
      <!-- 如果有子集 -->
      <template v-if="item.children && item.children.length > 0">
        <el-sub-menu :key="item.id" :index="item.path" :disabled="item.meta?.disabled" :popper-append-to-body="false">
          <template #title>
            <i :class="[item.meta?.icon]"></i>
            <!-- 添加空格 表示下级-->
            <span> {{ generateSpaces(item.id) }} </span>
            <span slot="title"> {{ item.meta?.title }}</span>
          </template>
          <Navbar :menu="item.children" :defaultActive="active" @clickItem="clickItemHandle" />
        </el-sub-menu>
      </template>
      <!-- 如果没有子集 -->
      <template v-else>
        <el-menu-item route :key="item.id" :index="item.id" :disabled="item.meta?.disabled"
          :popper-append-to-body="false" @click="clickItemHandle(item)">
          <i :class="[item.meta?.icon]"></i>
          <!-- 添加空格 表示下级-->
          <span> {{ generateSpaces(item.id) }} </span>
          <span slot="title">{{ item.meta?.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
<script lang="ts" name="Navbar" setup>
// 把下面代码变成setup语法糖的形式 
import type { PropType } from "vue";
import { useRouter } from "vue-router";
// type 为了方便写成这样 可以根据自己项目设定type
const props = defineProps({
  menu: {
    type: Array as unknown as PropType<any[]>,
    required: true,
    default: () => [],
  },
  defaultActive: {
    type: [String, Number] as unknown as PropType<string | number>,
    required: true,
    default: () => '1-1-1-1-2',
  },
});
const active = ref(props.defaultActive)
const emit = defineEmits(["update-active-path", "clickItem"]);
// 返回的空格字符串 用于显示菜单层级 
const generateSpaces = (level: string) => {
  let str = "";
  level.split("").filter((it) => it != "-").forEach(() => {
    str += "　";
  });
  return str;
};
const router = useRouter()
// 点击当前菜单项
const clickItemHandle = (item: any) => {
  router.push(item.path)
  emit("clickItem", item);
};
</script>
