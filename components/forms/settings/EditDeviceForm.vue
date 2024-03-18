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
      label="Инвентарный номер:"
      prop="inventoryNumber"
    >
      <a-input v-model="fields.inventoryNumber" />
    </a-form-model-item>
    <a-form-model-item
      has-feedback
      label="Расположение:"
      prop="location"
    >
      <a-input v-model="fields.location" />
    </a-form-model-item>
    <a-form-model-item
      v-if="id"
      label="QR код:"
    >
      <!-- TODO: to think about QR code component -->
      <qr-code-generator :json-object="fields" />
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
import QrCodeGenerator from '@/components/QrCodeGenerator.vue'

export default {
  components: { QrCodeGenerator },
  props: {
    id: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    inventoryNumber: {
      type: String,
      default: null
    },
    location: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isSubmitRequestPending: false,
      fields: {
        title: null,
        inventoryNumber: null,
        location: null
      },
      rules: {
        title: [
          {
            required: true,
            message: 'Поле является обязательным для заполнения',
            trigger: 'change'
          }
        ],
        inventoryNumber: [
          {
            required: true,
            message: 'Поле является обязательным для заполнения',
            trigger: 'change'
          }
        ],
        location: [
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
