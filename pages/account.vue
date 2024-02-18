<template>
  <a-row
    type="flex"
    justify="center"
    align="middle"
    :class="$style.root"
  >
    <a-col :span="6">
      <nuxt-child />
    </a-col>
  </a-row>
</template>

<script>
export default {
  layout: 'empty',
  tokenAuth: false
}
</script>

<style lang="less" module>
.root {
  flex: auto;
}
</style>
