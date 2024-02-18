<template>
  <a-breadcrumb
    v-if="items.length"
    :class="$style.root"
  >
    <a-breadcrumb-item
      v-for="(item, key) in items"
      :key="key"
    >
      <nuxt-link
        v-if="item.link"
        :to="item.link"
      >
        {{ item.name }}
      </nuxt-link>
      <template v-else>
        {{ item.name }}
      </template>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  computed: {
    items () {
      return this.$store.state.breadcrumb.items
    }
  }
}
</script>

<style lang="less" module>
.root {
  margin: @padding-md 0;
}
</style>
