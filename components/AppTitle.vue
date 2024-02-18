<template>
  <component
    :is="`h${level}`"
    :class="!noIndent || $style.noIndent"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    level: {
      type: Number,
      required: true,
      validator (value) {
        return [1, 2, 3, 4, 5].includes(value)
      }
    },
    noIndent: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" module>
.noIndent {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
