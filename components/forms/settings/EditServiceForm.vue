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
      label="Город:"
      prop="city"
    >
      <a-input v-model="fields.city" />
    </a-form-model-item>
    <a-form-model-item
      has-feedback
      label="Телефонный номер:"
      prop="phoneNumber"
    >
      <a-input v-model="fields.phoneNumber" />
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
    id: {
      type: Number,
      default: null
    },
    city: {
      type: String,
      default: null
    },
    phoneNumber: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isSubmitRequestPending: false,
      fields: {
        city: null,
        phoneNumber: null
      },
      rules: {
        city: [
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
          this.id ? this.saveService() : this.createService()
        } else {
          this.$message.warning('Некоторые поля заполнены неверно')
          return false
        }
      })
    },
    createService () {
      this.isSubmitRequestPending = true
      this.$api.servicesController
        .createService({
          ...this.fields
        })
        .then(({ data: id }) => {
          this.$message.success('Сервис успешно создан')
          this.$emit('success', id)
        })
        .finally(() => {
          this.isSubmitRequestPending = false
        })
    },
    saveService () {
      this.isSubmitRequestPending = true
      this.$api.servicesController
        .saveService({
          id: this.id,
          ...this.fields
        })
        .then(() => {
          this.$message.success('Сервис успешно сохранен')
          this.$emit('success')
        })
        .finally(() => {
          this.isSubmitRequestPending = false
        })
    }
  }
}
</script>
