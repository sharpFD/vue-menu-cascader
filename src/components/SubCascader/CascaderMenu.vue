<script>
import CascaderNode from './CascaderNode.vue';
import { generateId } from './utils/util';

export default {
  name: 'ElCascaderMenu',
  inject: ['panel'],
  components:{CascaderNode},
  props: {
    nodes: {
      type: Array,
      required: true
    },
    index: Number
  },
  provide() {
        return {
            menu: this
        };
  },
  data() {
    return {
      activeNode: null,
      hoverTimer: null,
      filterText:'',
      active: '',
      id: generateId()
    };
  },
  watch:{
      filterText(filterText){
          if (!!filterText){
              this.panel.handleClose()
          }
      }
  },
  computed: {
    isEmpty() {
      return !this.nodes.length || !!this.filterText && !this.reGenerateNode(this.nodes).length;
    },
    menuId() {
        debugger
      return `cascader-menu-${this.id}-${this.index}`;
    },
    useValue() {
        return this.panel.config.value
    },
    useLabel() {
        return this.panel.config.label
    }
  },
  mounted() {
      this.$nextTick(function () {
          this.$refs[this.menuId].wrap.addEventListener('scroll', this.onScroll)
      })
  },
  destroy() {
      this.$refs[this.menuId].wrap.removeEventListener('scroll')
  },
  methods: {
    handleExpand(e) {
      this.activeNode = e.target;
    },
    handleMouseMove(e) {
      const { activeNode, hoverTimer } = this;
      const { hoverZone } = this.$refs;

      if (!activeNode || !hoverZone) return;

      if (activeNode.contains(e.target)) {
        clearTimeout(hoverTimer);

        const { left } = this.$el.getBoundingClientRect();
        const startX = e.clientX - left;
        const { offsetWidth, offsetHeight } = this.$el;
        const top = activeNode.offsetTop;
        const bottom = top + activeNode.offsetHeight;

        hoverZone.innerHTML = `
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${top} L${offsetWidth} 0 V${top} Z" />
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${bottom} L${offsetWidth} ${offsetHeight} V${bottom} Z" />
        `;
      } else if (!hoverTimer) {
        this.hoverTimer = setTimeout(this.clearHoverZone, this.panel.config.hoverThreshold);
      }
    },
    toTarget(target) {
       this.active = (this.menuId + '_' + target)
       const toElement = document.querySelector(`#${this.menuId + '_' + target}`)
       toElement.parentNode.parentNode.parentNode.scrollTop = toElement.offsetTop;
    },
    onScroll() {
       let currentScroll = this.$refs[this.menuId].wrap.scrollTop
       let anchorList = document.querySelectorAll('.anchor-item')
       anchorList.forEach((dom, idx) => {
           let offsetTop = dom.offsetTop
           let nextOffsetTop = anchorList[idx + 1] && anchorList[idx + 1].offsetTop || Number.MAX_SAFE_INTEGER
           if (currentScroll + 10> offsetTop && currentScroll < nextOffsetTop) {
               this.active = dom.id
           }
       })
    },
    reGenerateNode(nodeList) {
        let {filterText} = this
        // 传入nodeList，返回组装好title的nodeList，用于筛选node后给node进行分类
        let title = '#'
        let titleAppearMap = {
            '#': false
        }
        let withTitleNodeList = nodeList.map(node=> {
            let o = _.cloneDeep(node)
            if (!!o.data.title) {
                title = o.data.title
                titleAppearMap[title] = false
            }

            if (!o.data.children) {
                o.data.title = title
                return o
            } else {
                o.data.children.forEach(child=> {
                    child.label = o.label + ' - ' + child.label,
                    child.title = title
                })
                return o
            }
        })
        let flatAllNodeList = withTitleNodeList.reduce((p,q) =>{
            if (q.hasChildren) {
                return p.concat(...q.children.map(child=> {
                    return child
                }))
            } else {
                return p.concat(q)
            }
        }, [])

        let filterNode = flatAllNodeList.filter(o=> o[this.useValue].toLowerCase().includes(filterText.toLowerCase()) || o.label.toLowerCase().includes(filterText.toLowerCase()))
        filterNode.forEach(node=> {
            if (!!titleAppearMap[node.data.title]){
                node.data.title = ''
            } else {
                titleAppearMap[node.data.title] = true
            }
        })
        return filterNode
    },
    clearHoverZone() {
      const { hoverZone } = this.$refs;
      if (!hoverZone) return;
      hoverZone.innerHTML = '';
    },
    renderEmptyText(h) {
      return (
        <div class="el-cascader-menu__empty-text">暂无数据</div>
      );
    },
    renderNodeList(h) {
      const { menuId , filterText} = this;
      const { isHoverMenu } = this.panel;
      const events = { on: {} };

      if (isHoverMenu) {
        events.on.expand = this.handleExpand;
      }

      let nodes = []
      if (!filterText) {
           nodes = this.nodes.map((node, index) => {
            const { hasChildren } = node;
              if (!!node.data.title) {
                  return (
                      <div>
                        <div id={this.menuId + '_' + node.data[this.useValue]} class="anchor-item" style="display: flex; align-items: center;">
                            <span style="display: inline-block; width: 3px; height: 12px; background: #03c08d;margin-left: 12px"></span>
                            <span style="font-size: 12px;color: #909399;margin-left: 4px;line-height:30px;">{node.data.title}</span>
                            <span style="flex: 1 0 auto; height: 1px; background: #e9f0f7;margin: 0 6px;"></span>
                        </div>
                        <cascader-node
                           key={ node.uid }
                           node={ node }
                           node-id={ `${menuId}-${index}` }
                           aria-haspopup={ hasChildren }
                           aria-owns = { hasChildren ? menuId : null }
                           { ...events }></cascader-node>
                      </div>
              )}
              else{
                  return (
                          <div>
                              <cascader-node
                                  key={ node.uid }
                                  node={ node }
                                  node-id={ `${menuId}-${index}` }
                                  aria-haspopup={ hasChildren }
                                  aria-owns = { hasChildren ? menuId : null }
                                  { ...events }></cascader-node>
                          </div>
              );
              }
          })
      } else {
          nodes = this.reGenerateNode(this.nodes).map((node, index) => {
              const { hasChildren } = node;
              if (!!node.data.title) {
                  return (
                      <div>
                          <div id={this.menuId + '_' + node.data[this.useValue]} class="anchor-item" style="display: flex; align-items: center;">
                          <span style="display: inline-block; width: 3px; height: 12px; background: #03c08d;margin-left: 12px"></span>
                          <span style="font-size: 12px;color: #909399;margin-left: 4px;line-height:30px;">{node.data.title}</span>
                          <span style="flex: 1 0 auto; height: 1px; background: #e9f0f7;margin: 0 6px;"></span>
                      </div>
                      <cascader-node
                          key={ node.uid }
                          node={ node }
                          node-id={ `${menuId}-${index}` }
                          aria-haspopup={ hasChildren }
                          aria-owns = { hasChildren ? menuId : null }
                          { ...events }></cascader-node>
                  </div>
              )}
              else{
                  return (
                      <div>
                          <cascader-node
                              key={ node.uid }
                              node={ node }
                              node-id={ `${menuId}-${index}` }
                              aria-haspopup={ hasChildren }
                              aria-owns = { hasChildren ? menuId : null }
                              { ...events }></cascader-node>
                       </div>
              );
              }
          })
      }

      return [
        ...nodes,
        isHoverMenu ? <svg ref='hoverZone' class='el-cascader-menu__hover-zone'></svg> : null
      ];
    }
  },

  render(h) {
    const { isEmpty, menuId } = this;
    const events = { nativeOn: {} };

    // optimize hover to expand experience (#8010)
    const {toTarget, filterText} = this;
    if (this.panel.isHoverMenu) {
      events.nativeOn.mousemove = this.handleMouseMove;
      // events.nativeOn.mouseleave = this.clearHoverZone;
    }
    let showTitle = this.nodes.some(o=> !!o.data.title) || false
    let showSearch = this.nodes.every(o=> o.level === 1) || false
    let titles = []
    if(!!showTitle) {
        titles = this.nodes.filter(o=> !!o.data.title && o.data.title)
    }
    /*!this.panel.activePath.length ? */
    let renderFixedDom = (
        <div class={showTitle && !showSearch ? 'anchor-second-bar' : 'anchor-bar'}>
           {showSearch ?
               <el-input class="filter-input" v-model={this.filterText} prefix-icon="el-icon-search" placeholder="搜索名称/英文名" size="mini" clearable></el-input>
               : ''
           }
           {showTitle && !filterText ?
               <div v-show="showTitle" class="cascader-top-menu">
               {titles.map(item => {
                       return <div class={{'cascader-tag' : true, 'active': this.active === (this.menuId + '_' + item.data[this.useValue])}} on-click={ () => toTarget(item.data[this.useValue]) }>{item.data.title}</div>
                   })}
               </div>
               : ''
           }
        </div>
    )
    let allText =''
    titles.forEach(node=>{allText += node.data.title})
    let topLength = allText.length * 12 + (titles.length + 1) * 16
    let gap = Math.ceil(topLength / 297)
    return (
      <div class="search-cascader">
          {renderFixedDom}
          <el-scrollbar
            ref={ menuId }
            style={showTitle && !!showSearch? {marginTop: 40 + gap * 20 + 'px'} : {marginTop: 15 + gap * 20 + 'px'}}
            tag="ul"
            role="menu"
            id={ menuId }
            class="el-cascader-menu"
            wrap-class="el-cascader-menu__wrap"
            view-class={{
              'el-cascader-menu__list': true,
              'is-empty': isEmpty
            }}
            { ...events }>
            { isEmpty ? this.renderEmptyText(h) : this.renderNodeList(h) }
          </el-scrollbar>
      </div>
    );
  }
};
</script>
<style lang="scss">
    .filter-input {
        .el-input__inner {
            border: 1px solid #ffffff;
            border-bottom: 1px solid #e9f0f7;
            &:hover {
                border-bottom: 1px solid #03c08d;
            }
            &:focus {
                border-bottom: 1px solid #03c08d;
            }
        }
    }
    .cascader-top-menu {
        display: flex;
        justify-content: flex-start;
        flex-flow: row wrap;
        align-items: center;
        margin: 4px;
        white-space: normal;

        .cascader-tag {
            cursor: pointer;
            background-color: #edf4fb;
            font-size: 12px;
            padding: 1px 4px;
            margin-right: 8px;
            margin-bottom: 4px;
            color: #475669;
            white-space: nowrap;
            transition: all .2s ease-in-out;
            &:hover {
                color: #03c08d;
            }
        }
        .active {
            color: #03c08d;
            background-color: #e5faef;
        }
    }
    .search-cascader{
        position: relative;
        @mixin anchor() {
            position: absolute;
            width: calc(100% - 12px);
            padding: 8px 8px 4px 8px;
        }
        .anchor-bar {
            @include anchor();
        }
        .anchor-second-bar {
            @include anchor();
            top: 0;
        }
    }

</style>
