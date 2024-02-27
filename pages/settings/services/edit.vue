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
    <a-spin v-if="$fetchState.pending" />
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
      service: null
    }
  },
  fetch () {
    if (this.id) {
      this.getService()
    }
  },
  mounted () {
    this.$store.commit(`breadcrumb/${UPDATE_ITEMS}`, [
      { name: 'Настройки' },
      { name: 'Сервисы', link: '/settings/services' },
      { name: this.id ? 'Редактирование' : 'Создание' }
    ])
  },
  methods: {
    getService () {
      this.$api.servicesController
        .getService(this.id)
        .then(({ data: service }) => {
          this.service = service
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
