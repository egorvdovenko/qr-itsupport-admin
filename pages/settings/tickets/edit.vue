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
    <a-spin v-if="$fetchState.pending" />
    <edit-ticket-form
      v-else
      v-bind="ticket"
      :users="users"
      :devices="devices"
      :documents="documents"
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
      ticket: null,
      users: [],
      devices: [],
      documents: []
    }
  },
  fetch () {
    if (this.id) {
      this.getTicket()
    }

    this.getUsers()
    this.getDevices()
    this.getDocuments()
  },
  mounted () {
    this.$store.commit(`breadcrumb/${UPDATE_ITEMS}`, [
      { name: 'Настройки' },
      { name: 'Тикеты', link: '/settings/tickets' },
      { name: this.id ? 'Редактирование' : 'Создание' }
    ])
  },
  methods: {
    getTicket () {
      this.$api.ticketsController
        .getTicket(this.id)
        .then(({ data: ticket }) => {
          this.ticket = ticket
        })
    },
    getUsers () {
      this.$api.usersController
        .getUsers()
        .then(({ data: { items } }) => {
          this.users = items
        })
    },
    getDevices () {
      this.$api.devicesController
        .getDevices()
        .then(({ data: { items } }) => {
          this.devices = items
        })
    },
    getDocuments () {
      this.$api.documentsController
        .getDocuments({ ticketId: this.id })
        .then(({ data: { items } }) => {
          this.documents = items
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
