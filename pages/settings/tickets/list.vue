<template>
  <app-wrapper
    filled
    inner-gap
  >
    <a-button
      type="primary"
      icon="plus"
      @click="$router.push({ name: 'TicketsEdit' })"
    >
      Добавить
    </a-button>
    <a-divider />
    <a-list
      item-layout="horizontal"
      size="large"
      :pagination="pagination"
      :data-source="tickets"
      :loading="isGetTicketsRequestPending"
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
          description="Идентификатор"
          :title="item.id"
        />
        <a-list-item-meta
          description="Наименование"
          :title="item.title"
        />
        <a-list-item-meta description="Статус">
          <a-tag
            slot="title"
            :color="item.isDone ? 'green' : 'blue'"
          >
            {{ item.isDone ? 'выполнен' : 'не выполнен' }}
          </a-tag>
        </a-list-item-meta>
        <a-dropdown-button
          slot="actions"
          :trigger="['click']"
        >
          <nuxt-link
            :to="{
              name: 'TicketsEdit',
              params: { id: item.id }
            }"
          >
            Редактировать
          </nuxt-link>
          <a-menu slot="overlay">
            <a-menu-item @click="deleteTicket(item)">
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
            name: 'TicketsList',
            query: { page }
          })
        },
        defaultCurrent: this.page,
        pageSize: 10
      },
      isGetTicketsRequestPending: false,
      tickets: []
    }
  },
  watch: {
    '$route.query' () {
      this.getTickets()
    }
  },
  mounted () {
    this.$store.commit(`breadcrumb/${UPDATE_ITEMS}`, [
      { name: 'Настройки' },
      { name: 'Тикеты' }
    ])

    this.getTickets()
  },
  methods: {
    getTickets (page = this.page) {
      this.isGetTicketsRequestPending = true
      this.$api.ticketsController
        .getTickets({
          page,
          pageSize: this.pagination.pageSize
        })
        .then(({ data: { totalItems, items } }) => {
          this.pagination.total = totalItems
          this.tickets = items
        })
        .finally(() => {
          this.isGetTicketsRequestPending = false
        })
    },
    deleteTicket ({ id, title }) {
      this.$confirm({
        title: 'Удаление элемента',
        content: `Вы собираетесь удалить тикет «${title}». Вы уверены, что хотите это сделать?`,
        okText: 'Да',
        cancelText: 'Нет',
        onOk: () => {
          this.$api.ticketsController
            .deleteTicket(id)
            .then(() => {
              this.$message.success('Тикет успешно удален')
              this.getTickets()
            })
        }
      })
    }
  }
}
</script>
