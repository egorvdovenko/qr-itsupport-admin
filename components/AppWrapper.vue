<template>
  <div
    :class="[
      !filled || $style.filled,
      !outerGap || $style.outerGap,
      !innerGap || $style.innerGap,
      !innerXGap || $style.innerXGap,
      !innerYGap || $style.innerYGap,
      !outerXGap || $style.outerXGap,
      !outerYGap || $style.outerYGap
    ]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    filled: {
      type: Boolean,
      default: false
    },
    outerGap: {
      type: Boolean,
      default: false
    },
    innerGap: {
      type: Boolean,
      default: false
    },
    innerXGap: {
      type: Boolean,
      default: false
    },
    innerYGap: {
      type: Boolean,
      default: false
    },
    outerXGap: {
      type: Boolean,
      default: false
    },
    outerYGap: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" module>
.filled {
  background-color: @white;
}

.innerGap {
  padding: @padding-lg;
}

.outerGap {
  margin: @padding-lg;
}

.innerXGap {
  padding: 0 @padding-lg;
}

.innerYGap {
  padding: @padding-lg 0;
}

.outerXGap {
  margin: 0 @padding-lg;
}

.outerYGap {
  margin: @padding-lg 0;
}
</style>
