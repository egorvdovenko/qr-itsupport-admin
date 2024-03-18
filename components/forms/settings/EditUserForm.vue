<template>
  <a-form-model
    ref="form"
    layout="vertical"
    :model="fields"
    :rules="rules"
    v-bind="{
      wrapperCol: { span: 8 },
    }"
    @submit.prevent="onSubmit"
  >
    <a-form-model-item
      has-feedback
      label="Email:"
      prop="email"
    >
      <a-input v-model="fields.email" />
    </a-form-model-item>
    <a-form-model-item
      has-feedback
      label="Номер телефона:"
      prop="phoneNumber"
    >
      <a-input v-model="fields.phoneNumber" />
    </a-form-model-item>
    <a-form-model-item
      has-feedback
      label="Роль:"
      prop="role"
    >
      <a-select
        v-model="fields.role"
        placeholder="Выберите роль"
      >
        <a-select-option
          v-for="(value, key) in USER_ROLE"
          :key="key"
          :value="value"
        >
          <a-row
            type="flex"
            justify="space-between"
          >
            <a-col>{{ value }}</a-col>
          </a-row>
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item
      has-feedback
      label="Сервис:"
      prop="serviceId"
    >
      <a-select
        v-if="services.length"
        v-model="fields.serviceId"
        placeholder="Выберите сервис"
      >
        <a-select-option
          v-for="service in services"
          :key="service.id"
          :value="service.id"
        >
          <a-row
            type="flex"
            justify="space-between"
          >
            <a-col>{{ service.city }}</a-col>
          </a-row>
        </a-select-option>
      </a-select>
      <a-alert
        v-else
        message="Список сервисов пуст. Необходимо заполнить соответствующий раздел"
        type="info"
        show-icon
      />
    </a-form-model-item>
    <a-form-model-item label="Подтвержден:">
      <a-switch v-model="fields.isConfirmed" />
    </a-form-model-item>
    <a-form-model-item
      v-if="id"
      label="Список тикетов:"
    >
      <a-list
        size="small"
        bordered
        :data-source="tickets"
        :locale="{
          emptyText: 'Список пуст'
        }"
      >
        <a-list-item
          slot="renderItem"
          slot-scope="item"
        >
          <a-list-item-meta :description="item.title" />
          <a-icon
            slot="actions"
            type="edit"
            @click="$router.push({
              name: 'TicketsEdit',
              params: { id: item.id },
              query: { ticketId: id }
            })"
          />
        </a-list-item>
      </a-list>
    </a-form-model-item>
    <a-button
      type="primary"
      html-type="submit"
      :loading="isSubmitRequestPending"
    >
      Сохранить
    </a-button>
  </a-form-model>
</template>

<script>
const USER_ROLE = {
  ADMIN: 'Admin',
  USER: 'User'
}

export default {
  props: {
    services: {
      type: Array,
      default: () => []
    },
    id: {
      type: Number,
      default: null
    },
    role: {
      type: String,
      default: null
    },
    serviceId: {
      type: Number,
      default: null
    },
    email: {
      type: String,
      default: null
    },
    phoneNumber: {
      type: String,
      default: null
    },
    tickets: {
      type: Array,
      default: () => []
    },
    isConfirmed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      USER_ROLE,
      isSubmitRequestPending: false,
      fields: {
        email: null,
        phoneNumber: null,
        role: null,
        serviceId: null,
        isConfirmed: false
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Поле является обязательным для заполнения',
            trigger: 'change'
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: 'Поле является обязательным для заполнения',
            trigger: 'change'
          }
        ],
        role: [
          {
            required: true,
            message: 'Поле является обязательным для заполнения',
            trigger: 'change'
          }
        ],
        serviceId: [
          {
            required: true,
            message: 'Поле является обязательным для заполнения',
            trigger: 'change'
          }
        ]
      }
    }
  },
  mounted () {
    this.fillDataFields()
  },
  methods: {
    fillDataFields () {
      for (const key in this.fields) {
        if (this[key] !== null && this[key] !== undefined) {
          this.fields[key] = this[key]
        }
      }
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.id ? this.saveUser() : this.createUser()
        } else {
          this.$message.warning('Некоторые поля заполнены неверно')
          return false
        }
      })
    },
    createUser () {
      this.isSubmitRequestPending = true
      this.$api.usersController
        .createUser({
          ...this.fields
        })
        .then(({ data: id }) => {
          this.$message.success('Пользователь успешно создан')
          this.$emit('success', id)
        })
        .finally(() => {
          this.isSubmitRequestPending = false
        })
    },
    saveUser () {
      this.isSubmitRequestPending = true
      this.$api.usersController
        .saveUser({
          id: this.id,
          ...this.fields
        })
        .then(() => {
          this.$message.success('Пользователь успешно сохранен')
          this.$emit('success')
        })
        .finally(() => {
          this.isSubmitRequestPending = false
        })
    }
  }
}
</script>
