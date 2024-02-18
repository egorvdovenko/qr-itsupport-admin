<template>
  <a-space
    :class="$style.root"
    v-bind="$attrs"
  >
    <slot />
  </a-space>
</template>

<script>
export default {}
</script>

<style lang="less" module>
.root {
  display: flex;
}
</style>
