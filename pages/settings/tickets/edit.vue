<template>
  <app-wrapper
    filled
    inner-gap
  >
    <h2 :class="$style.title">
      <template v-if="id">
        Редактирование тикета
      </template>
      <template v-else>
        Создание тикета
      </template>
    </h2>
    <a-spin v-if="isGetTicketRequestPending" />
    <edit-ticket-form
      v-else
      v-bind="ticket"
      :devices="devices"
      @success="onSuccess"
    />
  </app-wrapper>
</template>

<script>
import AppWrapper from '@/components/AppWrapper.vue'
import EditTicketForm from '@/components/forms/settings/EditTicketForm.vue'
import { UPDATE_ITEMS } from '@/store/breadcrumb.js'

export default {
  components: {
    AppWrapper,
    EditTicketForm
  },
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      isGetTicketRequestPending: false,
      ticket: null,
      devices: []
    }
  },
  mounted () {
    this.$store.commit(`breadcrumb/${UPDATE_ITEMS}`, [
      { name: 'Настройки' },
      { name: 'Тикеты', link: '/settings/tickets' },
      { name: this.id ? 'Редактирование' : 'Создание' }
    ])

    if (this.id) {
      this.getTicket()
    }

    this.getDevices()
  },
  methods: {
    getTicket () {
      this.isGetTicketRequestPending = true
      this.$api.ticketsController
        .getTicket(this.id)
        .then(({ data: ticket }) => {
          this.ticket = ticket
        })
        .finally(() => {
          this.isGetTicketRequestPending = false
        })
    },
    getDevices () {
      this.$api.devicesController
        .getDevices()
        .then(({ data: { items } }) => {
          this.devices = items
        })
    },
    onSuccess (id) {
      if (id) {
        this.$router.push({
          name: 'TicketsEdit',
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
