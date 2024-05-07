<script setup>
import { getCurrentInstance } from 'vue';
import { storeToRefs } from 'pinia';

import path from 'path-browserify';

import { useRoute, useRouter } from 'vue-router';

import { translateRouteTitleI18n } from '@/utils/i18n';

import { usePermissionStore } from '@/store/modules/permission';
import { useTagsViewStore } from '@/store/modules/tagsView';
import { useSettingsStore } from '@/store/modules/settings';
import { useAppStore } from '@/store/modules/app';

import ScrollPane from './ScrollPane.vue';

const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const permissionStore = usePermissionStore();
const tagsViewStore = useTagsViewStore();
const appStore = useAppStore();

const { visitedViews } = storeToRefs(tagsViewStore);
const settingsStore = useSettingsStore();
const layout = computed(() => settingsStore.layout);

const selectedTag = ref({});
const scrollPaneRef = ref();
const left = ref(0);
const top = ref(0);
const affixTags = ref([]);

watch(
  route,
  () => {
    addTags();
    moveToCurrentTag();
  },
  {
    //初始化立即执行
    immediate: true
  }
);

const tagMenuVisible = ref(false); // 标签操作菜单显示状态
watch(tagMenuVisible, value => {
  if (value) {
    document.body.addEventListener('click', closeTagMenu);
  } else {
    document.body.removeEventListener('click', closeTagMenu);
  }
});

/**
 * 递归筛选路由以查找固定标签，并返回标签数组。
 *
 * @param {Array} routes - 用于筛选固定标签的路由。
 * @param {string} basePath - 解析固定标签的基本路径。
 * @returns {Array} 带有路由信息的固定标签数组。
 */
function filterAffixTags(routes, basePath = '/') {
  let tags = [];

  routes.forEach(route => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      });
    }

    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path);
      if (childTags.length >= 1) {
        tags = tags.concat(childTags);
      }
    }
  });
  return tags;
}

/**
 * 根据存储中的固定标签初始化标签。
 */
function initTags() {
  const tags = filterAffixTags(permissionStore.getRouters);
  affixTags.value = tags;
  for (const tag of tags) {
    // Must have tag name
    if (tag.name) {
      tagsViewStore.addVisitedView(tag);
    }
  }
}

/**
 * 当路由激活时，将标签添加到视图。
 */
function addTags() {
  if (route.name) {
    tagsViewStore.addView(route);
  }
}

/**
 * 滚动到当前标签。
 */
function moveToCurrentTag() {
  nextTick(() => {
    for (const r of tagsViewStore.visitedViews) {
      if (r.path === route.path) {
        scrollPaneRef.value.moveToTarget(r);
        // when query is different then update
        if (r.fullPath !== route.fullPath) {
          tagsViewStore.updateVisitedView(route);
        }
      }
    }
  });
}

/**
 * 检查标签是否当前激活。
 */
function isActive(tag) {
  return tag.path === route.path;
}

/**
 * 检查标签是否为固定标签。
 */
function isAffix(tag) {
  return tag.meta && tag.meta.affix;
}

/**
 * 检查当前视图是否为第一个。
 */
function isFirstView() {
  try {
    return (
      selectedTag.value.fullPath === '/dashboard' ||
      selectedTag.value.fullPath === tagsViewStore.visitedViews[1].fullPath
    );
  } catch (err) {
    return false;
  }
}

/**
 * 检查当前视图是否为最后一个。
 */
function isLastView() {
  try {
    return (
      selectedTag.value.fullPath ===
      tagsViewStore.visitedViews[tagsViewStore.visitedViews.length - 1].fullPath
    );
  } catch (err) {
    return false;
  }
}

/**
 * 刷新选择的标签视图。
 *
 * @param {object} view - 要刷新的视图。
 */
function refreshSelectedTag(view) {
  tagsViewStore.delCachedView(view);
  const { fullPath } = view;
  nextTick(() => {
    router.replace({ path: '/redirect' + fullPath }).catch(err => {
      console.warn(err);
    });
  });
}

/**
 * 导航到最后访问的视图。
 *
 * @param {Array} visitedViews - 访问的视图数组。
 * @param {object} view - 当前视图。
 */
function toLastView(visitedViews, view) {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView && latestView.fullPath) {
    router.push(latestView.fullPath);
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'dashboard') {
      // to reload home page
      router.replace({ path: '/redirect' + view.fullPath });
    } else {
      router.push('/');
    }
  }
}

/**
 * 关闭选定的标签。
 *
 * @param {object} view - 选定的标签视图。
 */

function closeSelectedTag(view) {
  tagsViewStore.delView(view).then(res => {
    if (isActive(view)) {
      toLastView(res.visitedViews, view);
    }
  });
}

/**
 * 关闭选定标签左侧的所有标签。
 */
function closeLeftTags() {
  tagsViewStore.delLeftViews(selectedTag.value).then(res => {
    if (!res.visitedViews.find(item => item.fullPath === route.fullPath)) {
      toLastView(res.visitedViews);
    }
  });
}

/**
 * 关闭选定标签右侧的所有标签。
 */
function closeRightTags() {
  tagsViewStore.delRightViews(selectedTag.value).then(res => {
    if (!res.visitedViews.find(item => item.fullPath === route.fullPath)) {
      toLastView(res.visitedViews);
    }
  });
}

/**
 * 除了选定的标签外，关闭所有标签。
 */
function closeOtherTags() {
  router.push(selectedTag.value);
  tagsViewStore.delOtherViews(selectedTag.value).then(() => {
    moveToCurrentTag();
  });
}

/**
 * 关闭所有标签。
 *
 * @param {object} view - 选定的标签视图。
 */
function closeAllTags(view) {
  tagsViewStore.delAllViews().then(res => {
    toLastView(res.visitedViews, view);
  });
}

/**
 * 在指定位置打开标签菜单。
 *
 * @param {object} tag - 为其打开菜单的标签。
 * @param {Event} e - 单击事件。
 */
function openTagMenu(tag, e) {
  const menuMinWidth = 105;

  const offsetLeft = proxy?.$el.getBoundingClientRect().left; // container margin left
  const offsetWidth = proxy?.$el.offsetWidth; // container width
  const maxLeft = offsetWidth - menuMinWidth; // left boundary
  const l = e.clientX - offsetLeft + 15; // 15: margin right

  if (l > maxLeft) {
    left.value = maxLeft;
  } else {
    left.value = l;
  }

  // 混合模式下，需要减去顶部菜单(fixed)的高度
  if (layout.value === 'mix') {
    top.value = e.clientY - 50;
  } else {
    top.value = e.clientY;
  }

  tagMenuVisible.value = true;
  selectedTag.value = tag;
}

/**
 * 关闭标签菜单。
 */
function closeTagMenu() {
  tagMenuVisible.value = false;
}

/**
 * 处理滚动事件。
 */
function handleScroll() {
  closeTagMenu();
}

/**
 * 查找树节点的最外层父节点。
 *
 * @param {Array} tree - 要搜索的节点树。
 * @param {string} findName - 要查找的节点名称。
 * @returns {object} 最外层的父节点。
 */
function findOutermostParent(tree, findName) {
  let parentMap = {};

  /**
   * 递归构建节点的父节点映射。
   *
   * @param {object} node - 当前节点。
   * @param {object} parent - 父节点。
   */
  function buildParentMap(node, parent) {
    // 将当前节点与其父节点进行映射
    parentMap[node.name] = parent;

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        // 递归调用以构建子节点的映射
        buildParentMap(node.children[i], node);
      }
    }
  }

  for (let i = 0; i < tree.length; i++) {
    // 从根节点开始构建父节点映射
    buildParentMap(tree[i], null);
  }

  let currentNode = parentMap[findName];
  while (currentNode) {
    if (!parentMap[currentNode.name]) {
      return currentNode;
    }
    currentNode = parentMap[currentNode.name];
  }

  return null;
}

/**
 * 如果在 '混合' 模式下，再次激活布局的顶部菜单。
 *
 * @param {string} newVal - 要设置的新值。
 */
const againActiveTop = newVal => {
  if (layout.value !== 'mix') return;
  const parent = findOutermostParent(permissionStore.routes, newVal);
  if (appStore.activeTopMenu !== parent.path) {
    appStore.changeTopActive(parent.path);
  }
};

// 如果是混合模式，更改selectedTag，需要对应高亮的activeTop
watch(
  () => route.name,
  newVal => {
    if (newVal) {
      againActiveTop(newVal);
    }
  },
  {
    deep: true
  }
);
onMounted(() => {
  initTags();
});
</script>

<template>
  <div class="tags-container">
    <scroll-pane ref="scrollPaneRef" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :class="'tags-item ' + (isActive(tag) ? 'active' : '')"
        :data-path="tag.path"
        :to="{ path: tag.path, query: tag.query }"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openTagMenu(tag, $event)"
      >
        {{ translateRouteTitleI18n(tag.meta?.title) }}
        <span
          v-if="!isAffix(tag)"
          class="tags-item-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <i-ep-close class="text-[10px]" />
        </span>
      </router-link>
    </scroll-pane>

    <!-- tag标签操作菜单 -->
    <ul
      v-show="tagMenuVisible"
      class="tag-menu"
      :style="{ left: left + 'px', top: top + 'px' }"
    >
      <li @click="refreshSelectedTag(selectedTag)">
        <svg-icon icon-class="refresh" />
        刷新
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        <svg-icon icon-class="close" />
        关闭
      </li>
      <li @click="closeOtherTags">
        <svg-icon icon-class="close_other" />
        关闭其它
      </li>
      <li v-if="!isFirstView()" @click="closeLeftTags">
        <svg-icon icon-class="close_left" />
        关闭左侧
      </li>
      <li v-if="!isLastView()" @click="closeRightTags">
        <svg-icon icon-class="close_right" />
        关闭右侧
      </li>
      <li @click="closeAllTags(selectedTag)">
        <svg-icon icon-class="close_all" />
        关闭所有
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags-container {
  width: 100%;
  height: 34px;
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color-light);
  box-shadow: 0 1px 1px var(--el-box-shadow-light);

  .tags-item {
    display: inline-block;
    padding: 3px 8px;
    margin: 6px 0 0 5px;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid var(--el-border-color-light);

    &:first-of-type {
      margin-left: 15px;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    &:hover {
      color: var(--el-color-primary);
    }

    &.active {
      /* color: #fff; */
      /* background-color: var(--el-color-primary); */
      border-bottom: 2px solid var(--el-color-primary);

      &::before {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-right: 5px;
        content: '';
        background: var(--el-color-primary);
        border-radius: 50%;
      }
    }

    &-close {
      border-radius: 100%;

      &:hover {
        color: #fff;
        background: rgb(0 0 0 / 16%);
      }
    }
  }
}

.tag-menu {
  position: absolute;
  z-index: 99;
  font-size: 12px;
  background: var(--el-bg-color-overlay);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);

  li {
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background: var(--el-fill-color-light);
    }
  }
}
</style>
