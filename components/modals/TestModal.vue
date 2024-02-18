<template>
  <a-modal
    v-bind="$props"
    name="Тестовое модальное окно"
    v-on="$listeners"
  >
    <template slot="footer">
      <a-button @click="onClose">
        Закрыть
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import { Modal } from 'ant-design-vue'

export default {
  extends: Modal,
  methods: {
    onClose () {
      this.$emit('cancel')
    }
  }
}
</script>
