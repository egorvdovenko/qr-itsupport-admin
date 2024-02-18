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
      label="Наименование:"
      prop="title"
    >
      <a-input v-model="fields.title" />
    </a-form-model-item>
    <a-form-model-item
      has-feedback
      label="INN:"
      prop="inn"
    >
      <a-input v-model="fields.inn" />
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
    title: {
      type: String,
      default: null
    },
    inn: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isSubmitRequestPending: false,
      fields: {
        title: null,
        inn: null
      },
      rules: {
        title: [
          {
            required: true,
            message: 'Поле является обязательным для заполнения',
            trigger: 'change'
          }
        ],
        inn: [
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
          this.id ? this.saveDevice() : this.createDevice()
        } else {
          this.$message.warning('Некоторые поля заполнены неверно')
          return false
        }
      })
    },
    createDevice () {
      this.isSubmitRequestPending = true
      this.$api.devicesController
        .createDevice({
          ...this.fields
        })
        .then(({ data: id }) => {
          this.$message.success('Устройство успешно создано')
          this.$emit('success', id)
        })
        .finally(() => {
          this.isSubmitRequestPending = false
        })
    },
    saveDevice () {
      this.isSubmitRequestPending = true
      this.$api.devicesController
        .saveDevice({
          id: this.id,
          ...this.fields
        })
        .then(() => {
          this.$message.success('Устройство успешно сохранено')
          this.$emit('success')
        })
        .finally(() => {
          this.isSubmitRequestPending = false
        })
    }
  }
}
</script>
