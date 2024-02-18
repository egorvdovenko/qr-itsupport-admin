<template>
  <div>
    <slot
      name="upload"
      :handlePreview="handlePreview"
    />
    <a-modal
      :visible="visibility"
      :footer="null"
      :closable="false"
      @cancel="toggleVisibility"
    >
      <img
        alt="preview"
        :class="$style.image"
        :src="image"
      >
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      image: null,
      visibility: false
    }
  },
  methods: {
    handlePreview (file) {
      this.image = file.url

      this.toggleVisibility()
    },
    toggleVisibility () {
      this.visibility = !this.visibility
    }
  }
}
</script>

<style lang="less" module>
.image {
  width: 100%;
}
</style>
