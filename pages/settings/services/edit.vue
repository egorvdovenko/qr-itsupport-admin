<template>
  <app-wrapper
    filled
    inner-gap
  >
    <h2 :class="$style.title">
      <template v-if="id">
        Редактирование сервиса
      </template>
      <template v-else>
        Создание сервиса
      </template>
    </h2>
    <a-spin v-if="isGetServiceRequestPending" />
    <edit-service-form
      v-else
      v-bind="service"
      @success="onSuccess"
    />
  </app-wrapper>
</template>

<script>
import AppWrapper from '@/components/AppWrapper.vue'
import EditServiceForm from '@/components/forms/settings/EditServiceForm.vue'
import { UPDATE_ITEMS } from '@/store/breadcrumb.js'

export default {
  components: {
    AppWrapper,
    EditServiceForm
  },
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      isGetServiceRequestPending: false,
      service: null
    }
  },
  mounted () {
    this.$store.commit(`breadcrumb/${UPDATE_ITEMS}`, [
      { name: 'Настройки' },
      { name: 'Сервисы', link: '/settings/services' },
      { name: this.id ? 'Редактирование' : 'Создание' }
    ])

    if (this.id) {
      this.getService()
    }
  },
  methods: {
    getService () {
      this.isGetServiceRequestPending = true
      this.$api.servicesController
        .getService(this.id)
        .then(({ data: service }) => {
          this.service = service
        })
        .finally(() => {
          this.isGetServiceRequestPending = false
        })
    },
    onSuccess (id) {
      if (id) {
        this.$router.push({
          name: 'ServicesEdit',
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
