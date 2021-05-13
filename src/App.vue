<template>
  <div id="app">
    <vue-menu-cascader
      :options="cascaderOptions"
      v-model="value"
      :props="{ expandTrigger: 'hover', multiple: true, emitPath: false }"
    >
      <template slot-scope="{ node, data }">
        <span>{{ data.label }}</span>
      </template>
      <template v-slot:reference>
        <el-button
          icon="el-icon-plus"
          class="item-container-btn"
          slot="reference"
          >添加指标
        </el-button>
      </template>
      <template v-slot:desc="{ scope }">
        <div style="width: 300px;height: 250px;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);">这里是右侧append的描述, {{ scope.data }}</div>
      </template>
    </vue-menu-cascader>
  </div>
</template>

<script>
import VueMenuCascader from './components/SubCascader/VueMenuCascader'
export default {
  name: 'app',
  data() {
    return {
      cascaderOptions: [
        {
          value: "新增",
          label: "新增",
          children: [
            {
              title: "新增", // 此处title为分类，后续未设置title的都属于“新增”分类下，直到出现下一个title
              label: "新增UV",
              value: "new_uv_1d",
            },
            {
              label: "新增次数",
              value: "new_cnt_1d",
            },
            {
              label: "新增天数",
              value: "new_days_cnt_1d",
            },
          ],
          sort: 0,
        },
        {
          value: "展现点击",
          label: "展现点击",
          children: [
            {
              title: "页面", // 第一个分类
              label: "页面展示次数",
              value: "page_test"
            },
            {
              label: "页面UV",
              value: "show_uv_1d",
            },
            {
              title: "位置",
              label: "位置点击次数",
              value: "click_cnt_1d",
            },
            {
              label: "位置点击UV",
              value: "click_uv_1d",
            },
            {
              label: "页面展示天数",
              value: "pageview_days_1d",
            },
            {
              label: "位置点击天数",
              value: "click_days_1d",
            },
            {
              title: "区块", // 第二个分类
              label: "区块展示次数",
              value: "blockview_cnt_1d",
            },
            {
              label: "区块展示UV",
              value: "blockview_uv_1d",
            },
            {
              label: "区块展示天数",
              value: "blockview_days_1d",
            },
            {
              title: "内容展示",
              label: "内容展示次数",
              value: "itemview_cnt_1d",
            },
            {
              label: "内容展示UV",
              value: "itemview_uv_1d",
            },
            {
              label: "内容展示天数",
              value: "itemview_days_1d",
            },
            {
              label: "位置点击视频个数",
              value: "click_episode_cnt_1d",
            },
            {
              label: "内容展示视频个数",
              value: "itemview_episode_cnt_1d",
            },
            {
              label: "人均点击视频个数",
              value: "avg_click_episode_cnt_1d",
            },
            {
              label: "人均内容展示视频个数",
              value: "avg_itemview_episode_cnt_1d",
            },
            {
              label: "内容展示视频设备数",
              value: "itemview_episode_u_cnt_1d",
            },
            {
              label: "人均内容展示视频设备数",
              value: "avg_itemview_episode_u_cnt_1d",
            },
          ],
        },
      ],
    };
  },
  components:{VueMenuCascader}
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
