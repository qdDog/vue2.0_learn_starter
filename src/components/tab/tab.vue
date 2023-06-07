<script setup></script>

<template>
  <div class="tab-container">
    <router-link tag="div" class="tab-item" to="/recommend">推荐</router-link>
    <router-link tag="div" class="tab-item" to="/singer">歌手</router-link>
    <router-link tag="div" class="tab-item" to="/rank">排行</router-link>
    <router-link tag="div" class="tab-item" to="/search">搜索</router-link>
  </div>
</template>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.tab-container
  display: flex
  height: 44px
  line-height: 44px
  font-size: $font-size-medium
  .tab-item
    flex: 1
    text-align: center
    padding-bottom: 5px
    color: $color-text-l
  .router-link-active
    color: $color-theme
    border-bottom: 2px solid $color-theme
</style>
