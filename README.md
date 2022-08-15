# vue-menu-cascader

> 基于element-ui的支持搜索，分类，锚点定位的cascader


## preview 效果预览

![vue-menu-cascader](https://s3.ax1x.com/2021/02/05/y8eGcj.gif)

## environment 环境

 element-ui > 2.1.0

## install 安装

```shell
npm i element-ui --save
npm i vue-menu-cascader --save
```
因为用到jsx语法和jsx-v-model语法，需要安装babel插件

```shell
npm install babel-plugin-jsx-v-model babel-plugin-transform-vue-jsx -D
```

然后在babelrc中配置

```javascript
{
  ...,
  "plugins": [ // 需要配置以下两个插件
    "jsx-v-model",
    "transform-vue-jsx"
  ]
}


```


## use 使用

全局使用：在main.js中写入下面的代码

```javascript
import VueMenuCascader from "vue-menu-cascader";
Vue.use(VueMenuCascader);
```

文件中使用：

```javascript
<scrpit>
    import VueMenuCascader from "vue-menu-cascader";

    export default{
        components:{VueMenuCascader}
    }
</script>
```

接下来，你就可以在页面中使用vue-menu-cascader了

```html
<template>
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
</template>
<script>
    export default {
        data () {
            return {
                cascaderOptions: [
                                     {
                                         "value":"新增",
                                         "label":"新增",
                                         "children":[
                                             {
                                                 "title":"新增",   // 此处title为分类，后续未设置title的都属于“新增”分类下，直到出现下一个title
                                                 "label":"新增UV",
                                                 "value":"new_uv_1d"
                                             },
                                             {
                                                 "label":"新增次数",
                                                 "value":"new_cnt_1d"
                                             },
                                             {
                                                 "label":"新增天数",
                                                 "value":"new_days_cnt_1d"
                                             }
                                         ],
                                         "sort":0
                                     },
                                     {
                                         "value":"展现点击",
                                         "label":"展现点击",
                                         "children":[
                                             {
                                                 "title":"页面",  // 第一个分类
                                                 "label":"页面展示次数",
                                                 "value": "page_test"
                                             },
                                             {
                                                 "label":"页面UV",
                                                 "value":"show_uv_1d"
                                             },
                                             {
                                                 "title":"位置",
                                                 "label":"位置点击次数",
                                                 "value":"click_cnt_1d"
                                             },
                                             {
                                                 "label":"位置点击UV",
                                                 "value":"click_uv_1d"
                                             },
                                             {
                                                 "label":"页面展示天数",
                                                 "value":"pageview_days_1d"
                                             },
                                             {
                                                 "label":"位置点击天数",
                                                 "value":"click_days_1d"
                                             },
                                             {
                                                 "title":"区块", // 第二个分类
                                                 "label":"区块展示次数",
                                                 "value":"blockview_cnt_1d"
                                             },
                                             {
                                                 "label":"区块展示UV",
                                                 "value":"blockview_uv_1d"
                                             },
                                             {
                                                 "label":"区块展示天数",
                                                 "value":"blockview_days_1d"
                                             },
                                             {
                                                 "title":"内容展示",
                                                 "label":"内容展示次数",
                                                 "value":"itemview_cnt_1d"
                                             },
                                             {
                                                 "label":"内容展示UV",
                                                 "value":"itemview_uv_1d"
                                             },
                                             {
                                                 "label":"内容展示天数",
                                                 "value":"itemview_days_1d"
                                             },
                                             {
                                                 "label":"位置点击视频个数",
                                                 "value":"click_episode_cnt_1d"
                                             },
                                             {
                                                 "label":"内容展示视频个数",
                                                 "value":"itemview_episode_cnt_1d"
                                             },
                                             {
                                                 "label":"人均点击视频个数",
                                                 "value":"avg_click_episode_cnt_1d"
                                             },
                                             {
                                                 "label":"人均内容展示视频个数",
                                                 "value":"avg_itemview_episode_cnt_1d"
                                             },
                                             {
                                                 "label":"内容展示视频设备数",
                                                 "value":"itemview_episode_u_cnt_1d"
                                             },
                                             {
                                                 "label":"人均内容展示视频设备数",
                                                 "value":"avg_itemview_episode_u_cnt_1d"
                                             }
                                         ]
                                     }
                                 ],
                value: []
            }
        }
    }
</script>
```

:::

### Cascader Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 选中项绑定值 | - | — | — |
| options | 可选项数据源，键名可通过 `Props` 属性配置 | array | — | — |
| props | 配置选项，具体见下表 | object | — | — |
| size | 尺寸 | string | medium / small / mini | — |
| placeholder | 输入框占位文本 | string | — | 请选择 |
| disabled | 是否禁用 | boolean | — | false |
| clearable | 是否支持清空选项 | boolean | — | false |
| show-all-levels | 输入框中是否显示选中值的完整路径 | boolean | — | true |
| collapse-tags | 多选模式下是否折叠Tag | boolean | - | false |
| separator | 选项分隔符 | string | — | 斜杠' / ' |
| filterable | 是否可搜索选项 | boolean | — | — |
| filter-method | 自定义搜索逻辑，第一个参数是节点`node`，第二个参数是搜索关键词`keyword`，通过返回布尔值表示是否命中 | function(node, keyword) | - | - |
| debounce | 搜索关键词输入的去抖延迟，毫秒 | number | — | 300 |
| before-filter | 筛选之前的钩子，参数为输入的值，若返回 false 或者返回 Promise 且被 reject，则停止筛选 | function(value) | — | — |
| popper-class | 自定义浮层类名   | string | —  | — |

### Cascader Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change | 当选中节点变化时触发 | 选中节点的值 |
| expand-change | 当展开节点发生变化时触发 | 各父级选项值组成的数组 |
| blur | 当失去焦点时触发 | (event: Event) |
| focus | 当获得焦点时触发 | (event: Event) |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 在多选模式下，移除Tag时触发 | 移除的Tag对应的节点的值 |

### Cascader Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| getCheckedNodes | 获取选中的节点 | (leafOnly) 是否只是叶子节点，默认值为 `false` |

### Cascader Slots
| 名称     | 说明 |
|---------|-------------|
| - | 自定义备选项的节点内容，参数为 { node, data }，分别为当前节点的 Node 对象和数据 |
| empty  | 无匹配选项时的内容 |
| reference  | 触发popover的组件，一般为一个按钮，这个slot必填，否则无效果 |
| desc  | 用于菜单最右边append一个自定义内容的菜单 |


### Props
| 参数     | 说明              | 类型   | 可选值 | 默认值 |
| -------- | ----------------- | ------ | ------ | ------ |
| expandTrigger | 次级菜单的展开方式 | string | click / hover | 'click' |
| multiple | 是否多选 | boolean | - | false |
| checkStrictly | 是否严格的遵守父子节点不互相关联 | boolean | - | false |
| emitPath | 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值 | boolean | - | true |
| lazy | 是否动态加载子节点，需与 lazyLoad 方法结合使用 | boolean | - | false |
| lazyLoad | 加载动态数据的方法，仅在 lazy 为 true 时有效 | function(node, resolve)，`node`为当前点击的节点，`resolve`为数据加载完成的回调(必须调用) | - | - |
| value    | 指定选项的值为选项对象的某个属性值 | string | — | 'value' |
| label    | 指定选项标签为选项对象的某个属性值 | string | — | 'label' |
| title    | 指定选项标签的分类，注意，传进来的输入必须事先按分类排序，将同一分类下的第一个设置title | string | — | 'label' |
| children | 指定选项的子选项为选项对象的某个属性值 | string | — | 'children' |
| disabled | 指定选项的禁用为选项对象的某个属性值 | string | — | 'disabled' |
| leaf     | 指定选项的叶子节点的标志位为选项对象的某个属性值 | string | — | 'leaf' |

## 更新日志

**版本：1.0.7**

Contributor: [@sharpFD](<https://github.com/sharpFD>)

时间：2021年2月5日

内容：

- feature： 初始化提交

--------

**版本：1.0.8**

Contributor: [@sharpFD](<https://github.com/sharpFD>)

时间：2021年4月27日

内容：

- bugfix： 修复传入的options默认读取的prop不是value和label时，报错的问题

**版本：1.2.2**

Contributor: [@sharpFD](<https://github.com/sharpFD>)

时间：2021年5月12日

内容：

- bugfix：修复组件无法搜索问题，加入lodash，更新README
  

**版本：1.2.2**

Contributor: [@sharpFD](<https://github.com/sharpFD>)

时间：2022年8月15日

内容：

- bugfix：搜索框自动聚焦
--------

​
