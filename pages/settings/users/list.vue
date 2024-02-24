<template>
  <app-wrapper
    filled
    inner-gap
  >
    <a-button
      type="primary"
      icon="plus"
      @click="$router.push({ name: 'UsersEdit' })"
    >
      Добавить
    </a-button>
    <a-divider />
    <a-list
      item-layout="horizontal"
      size="large"
      :pagination="pagination"
      :data-source="users"
      :loading="isGetUsersRequestPending"
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
          description="Email"
          :title="item.email"
        />
        <a-list-item-meta
          description="Сервис"
          :title="item.service.city"
        />
        <a-list-item-meta description="Статус">
          <a-tag
            slot="title"
            :color="item.isConfirmed ? 'green' : 'blue'"
          >
            {{ item.isConfirmed ? 'подтвержден' : 'не подтвержден' }}
          </a-tag>
        </a-list-item-meta>
        <a-dropdown-button
          slot="actions"
          :trigger="['click']"
        >
          <nuxt-link
            :to="{
              name: 'UsersEdit',
              params: { id: item.id }
            }"
          >
            Редактировать
          </nuxt-link>
          <a-menu slot="overlay">
            <a-menu-item @click="deleteUser(item)">
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
            name: 'UsersList',
            query: { page }
          })
        },
        defaultCurrent: this.page,
        pageSize: 10
      },
      isGetUsersRequestPending: false,
      users: []
    }
  },
  watch: {
    '$route.query' () {
      this.getUsers()
    }
  },
  mounted () {
    this.$store.commit(`breadcrumb/${UPDATE_ITEMS}`, [
      { name: 'Настройки' },
      { name: 'Пользователи' }
    ])

    this.getUsers()
  },
  methods: {
    getUsers (page = this.page) {
      this.isGetUsersRequestPending = true
      this.$api.usersController
        .getUsers({
          page,
          pageSize: this.pagination.pageSize
        })
        .then(({ data: { totalItems, items } }) => {
          this.pagination.total = totalItems
          this.users = items
        })
        .finally(() => {
          this.isGetUsersRequestPending = false
        })
    },
    deleteUser ({ id, title }) {
      this.$confirm({
        title: 'Удаление элемента',
        content: `Вы собираетесь удалить пользователь «${title}». Вы уверены, что хотите это сделать?`,
        okText: 'Да',
        cancelText: 'Нет',
        onOk: () => {
          this.$api.usersController
            .deleteUser(id)
            .then(() => {
              this.$message.success('Пользователь успешно удален')
              this.getUsers()
            })
        }
      })
    }
  }
}
</script>
