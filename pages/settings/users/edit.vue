<template>
  <app-wrapper
    filled
    inner-gap
  >
    <h2 :class="$style.title">
      <template v-if="id">
        Редактирование пользователя
      </template>
      <template v-else>
        Создание пользователя
      </template>
    </h2>
    <a-spin v-if="$fetchState.pending" />
    <edit-user-form
      v-else
      v-bind="user"
      :services="services"
      :tickets="tickets"
      @success="onSuccess"
    />
  </app-wrapper>
</template>

<script>
import AppWrapper from '@/components/AppWrapper.vue'
import EditUserForm from '@/components/forms/settings/EditUserForm.vue'
import { UPDATE_ITEMS } from '@/store/breadcrumb.js'

export default {
  components: {
    AppWrapper,
    EditUserForm
  },
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      user: null,
      services: [],
      tickets: []
    }
  },
  fetch () {
    if (this.id) {
      this.getUser()
    }

    this.getServices()
    this.getTickets()
  },
  mounted () {
    this.$store.commit(`breadcrumb/${UPDATE_ITEMS}`, [
      { name: 'Настройки' },
      { name: 'Пользователи', link: '/settings/users' },
      { name: this.id ? 'Редактирование' : 'Создание' }
    ])
  },
  methods: {
    getUser () {
      this.$api.usersController
        .getUser(this.id)
        .then(({ data: user }) => {
          this.user = user
        })
    },
    getServices () {
      this.$api.servicesController
        .getServices()
        .then(({ data: { items } }) => {
          this.services = items
        })
    },
    getTickets () {
      this.$api.ticketsController
        .getTickets({ userId: this.id })
        .then(({ data: { items } }) => {
          this.tickets = items
        })
    },
    onSuccess (id) {
      if (id) {
        this.$router.push({
          name: 'UsersEdit',
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
