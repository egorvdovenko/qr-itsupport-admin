<template>
  <app-wrapper
    filled
    inner-gap
  >
    <h2 :class="$style.title">
      <template v-if="id">
        Редактирование устройства
      </template>
      <template v-else>
        Создание устройства
      </template>
    </h2>
    <a-spin v-if="isGetDeviceRequestPending" />
    <edit-device-form
      v-else
      v-bind="device"
      @success="onSuccess"
    />
  </app-wrapper>
</template>

<script>
import AppWrapper from '@/components/AppWrapper.vue'
import EditDeviceForm from '@/components/forms/settings/EditDeviceForm.vue'
import { UPDATE_ITEMS } from '@/store/breadcrumb.js'

export default {
  components: {
    AppWrapper,
    EditDeviceForm
  },
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      isGetDeviceRequestPending: false,
      device: null
    }
  },
  mounted () {
    this.$store.commit(`breadcrumb/${UPDATE_ITEMS}`, [
      { name: 'Настройки' },
      { name: 'Устройства', link: '/settings/devices' },
      { name: this.id ? 'Редактирование' : 'Создание' }
    ])

    if (this.id) {
      this.getDevice()
    }
  },
  methods: {
    getDevice () {
      this.isGetDeviceRequestPending = true
      this.$api.devicesController
        .getDevice(this.id)
        .then(({ data: device }) => {
          this.device = device
        })
        .finally(() => {
          this.isGetDeviceRequestPending = false
        })
    },
    onSuccess (id) {
      if (id) {
        this.$router.push({
          name: 'DevicesEdit',
          params: { id }
        })
      }
    }
  }
}
</script>

<style lang="less" module>
.title {
  margin-bottom: @padding-lg;
}
</style>
