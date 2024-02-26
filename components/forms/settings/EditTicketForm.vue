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
      label="Идентификатор:"
      prop="id"
    >
      <a-input
        :value="id"
        disabled
      />
    </a-form-model-item>
    <a-form-model-item
      has-feedback
      label="Наименование:"
      prop="title"
    >
      <a-input v-model="fields.title" />
    </a-form-model-item>
    <a-form-model-item
      has-feedback
      label="Описание:"
      prop="description"
    >
      <a-textarea
        v-model="fields.description"
        :rows="8"
      />
    </a-form-model-item>
    <a-form-model-item
      has-feedback
      label="Устройства:"
      prop="deviceId"
    >
      <a-select
        v-if="devices.length"
        v-model="fields.deviceId"
        placeholder="Выберите устройство"
      >
        <a-select-option
          v-for="device in devices"
          :key="device.id"
          :value="device.id"
        >
          <a-row
            type="flex"
            justify="space-between"
          >
            <a-col>{{ device.title }}</a-col>
          </a-row>
        </a-select-option>
      </a-select>
      <a-alert
        v-else
        message="Список устройств пуст. Необходимо заполнить соответствующий раздел"
        type="info"
        show-icon
      />
    </a-form-model-item>
    <a-form-model-item label="Выполнен:">
      <a-switch v-model="fields.isDone" />
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
export default {
  props: {
    devices: {
      type: Array,
      default: () => []
    },
    id: {
      type: Number,
      default: null
    },
    deviceId: {
      type: Number,
      default: null
    },
    userId: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    isDone: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isSubmitRequestPending: false,
      fields: {
        title: null,
        description: null,
        deviceId: null,
        isDone: false
      },
      rules: {
        title: [
          {
            required: true,
            message: 'Поле является обязательным для заполнения',
            trigger: 'change'
          }
        ],
        description: [
          {
            required: true,
            message: 'Поле является обязательным для заполнения',
            trigger: 'change'
          }
        ],
        deviceId: [
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
          this.id ? this.saveTicket() : this.createTicket()
        } else {
          this.$message.warning('Некоторые поля заполнены неверно')
          return false
        }
      })
    },
    createTicket () {
      this.isSubmitRequestPending = true
      this.$api.ticketsController
        .createTicket({
          ...this.fields
        })
        .then(({ data: id }) => {
          this.$message.success('Тикет успешно создан')
          this.$emit('success', id)
        })
        .finally(() => {
          this.isSubmitRequestPending = false
        })
    },
    saveTicket () {
      this.isSubmitRequestPending = true
      this.$api.ticketsController
        .saveTicket({
          id: this.id,
          userId: this.userId,
          ...this.fields
        })
        .then(() => {
          this.$message.success('Тикет успешно сохранен')
          this.$emit('success')
        })
        .finally(() => {
          this.isSubmitRequestPending = false
        })
    }
  }
}
</script>
