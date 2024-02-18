<template>
  <span :class="$style[type]">
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default',
      validator (value) {
        return [
          'default',
          'secondary',
          'inverse',
          'dark',
          'secondary-dark',
          'success',
          'warning',
          'error'
        ].includes(value)
      }
    }
  }
}
</script>

<style lang="less" module>
.default {
  color: @text-color;
}

.secondary {
  color: @text-color-secondary;
}

.inverse {
  color: @text-color-inverse;
}

.dark {
  color: @text-color-dark;
}

.secondary-dark {
  color: @text-color-secondary-dark;
}

.disabled {
  color: @disabled-color;
}

.error {
  color: @error-color;
}

.success {
  color: @success-color;
}

.warning {
  color: @warning-color;
}
</style>
