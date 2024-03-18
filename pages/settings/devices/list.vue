<template>
  <app-wrapper
    filled
    inner-gap
  >
    <a-button
      type="primary"
      icon="plus"
      @click="$router.push({ name: 'DevicesEdit' })"
    >
      Добавить
    </a-button>
    <a-divider />
    <!-- TODO: think about table component -->
    <a-list
      item-layout="horizontal"
      size="large"
      :pagination="pagination"
      :data-source="devices"
      :loading="isGetDevicesRequestPending"
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
          description="Наименование"
          :title="item.title"
        />
        <a-list-item-meta
          description="Инвентарный номер"
          :title="item.inventoryNumber"
        />
        <a-list-item-meta
          description="Расположение"
          :title="item.location"
        />
        <a-dropdown-button
          slot="actions"
          :trigger="['click']"
        >
          <nuxt-link
            :to="{
              name: 'DevicesEdit',
              params: { id: item.id }
            }"
          >
            Редактировать
          </nuxt-link>
          <a-menu slot="overlay">
            <a-menu-item @click="deleteDevice(item)">
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
            name: 'DevicesList',
            query: { page }
          })
        },
        defaultCurrent: this.page,
        pageSize: 10
      },
      isGetDevicesRequestPending: false,
      devices: []
    }
  },
  watch: {
    '$route.query' () {
      this.getDevices()
    }
  },
  mounted () {
    this.$store.commit(`breadcrumb/${UPDATE_ITEMS}`, [
      { name: 'Настройки' },
      { name: 'Устройства' }
    ])

    this.getDevices()
  },
  methods: {
    getDevices (page = this.page) {
      this.isGetDevicesRequestPending = true
      this.$api.devicesController
        .getDevices({
          page,
          pageSize: this.pagination.pageSize
        })
        .then(({ data: { totalItems, items } }) => {
          this.pagination.total = totalItems
          this.devices = items
        })
        .finally(() => {
          this.isGetDevicesRequestPending = false
        })
    },
    deleteDevice ({ id, title }) {
      this.$confirm({
        title: 'Удаление элемента',
        content: `Вы собираетесь удалить устройство «${title}». Вы уверены, что хотите это сделать?`,
        okText: 'Да',
        cancelText: 'Нет',
        onOk: () => {
          this.$api.devicesController
            .deleteDevice(id)
            .then(() => {
              this.$message.success('Устройство успешно удалено')
              this.getDevices()
            })
        }
      })
    }
  }
}
</script>
