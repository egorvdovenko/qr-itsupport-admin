<template>
  <app-wrapper
    filled
    inner-gap
  >
    <a-button
      type="primary"
      icon="plus"
      @click="$router.push({ name: 'ServicesEdit' })"
    >
      Добавить
    </a-button>
    <a-divider />
    <a-list
      item-layout="horizontal"
      size="large"
      :pagination="pagination"
      :data-source="services"
      :loading="isGetServicesRequestPending"
      :locale="{
        emptyText: 'Список пуст'
      }"
      bordered
    >
      <a-list-item
        slot="renderItem"
        slot-scope="item"
      >
        <a-list-item-meta
          description="Город"
          :title="item.city"
        />
        <a-list-item-meta
          description="Телефонный номер"
          :title="item.phoneNumber"
        />
        <a-dropdown-button
          slot="actions"
          :trigger="['click']"
        >
          <nuxt-link
            :to="{
              name: 'ServicesEdit',
              params: { id: item.id }
            }"
          >
            Редактировать
          </nuxt-link>
          <a-menu slot="overlay">
            <a-menu-item @click="deleteService(item)">
              Удалить
            </a-menu-item>
          </a-menu>
        </a-dropdown-button>
      </a-list-item>
    </a-list>
  </app-wrapper>
</template>

<script>
import AppWrapper from '@/components/AppWrapper.vue'
import { UPDATE_ITEMS } from '@/store/breadcrumb.js'

export default {
  components: {
    AppWrapper
  },
  props: {
    page: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      pagination: {
        onChange: (page) => {
          this.$router.push({
            name: 'ServicesList',
            query: { page }
          })
        },
        defaultCurrent: this.page,
        pageSize: 10
      },
      isGetServicesRequestPending: false,
      services: []
    }
  },
  watch: {
    '$route.query' () {
      this.getServices()
    }
  },
  mounted () {
    this.$store.commit(`breadcrumb/${UPDATE_ITEMS}`, [
      { name: 'Настройки' },
      { name: 'Сервисы' }
    ])

    this.getServices()
  },
  methods: {
    getServices (page = this.page) {
      this.isGetServicesRequestPending = true
      this.$api.servicesController
        .getServices({
          page,
          pageSize: this.pagination.pageSize
        })
        .then(({ data: { totalItems, items } }) => {
          this.pagination.total = totalItems
          this.services = items
        })
        .finally(() => {
          this.isGetServicesRequestPending = false
        })
    },
    deleteService ({ id, title }) {
      this.$confirm({
        title: 'Удаление элемента',
        content: `Вы собираетесь удалить сервис «${title}». Вы уверены, что хотите это сделать?`,
        okText: 'Да',
        cancelText: 'Нет',
        onOk: () => {
          this.$api.servicesController
            .deleteService(id)
            .then(() => {
              this.$message.success('Сервис успешно удален')
              this.getServices()
            })
        }
      })
    }
  }
}
</script>
