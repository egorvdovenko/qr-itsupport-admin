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
      label="Пользователь:"
      prop="userId"
    >
      <a-select
        v-model="fields.userId"
        placeholder="Выберите пользователя"
      >
        <a-select-option
          v-for="user in users"
          :key="user.id"
          :value="user.id"
        >
          <a-row
            type="flex"
            justify="space-between"
          >
            <a-col>{{ user.email }}</a-col>
          </a-row>
        </a-select-option>
      </a-select>
      <a-alert
        v-if="!users.length"
        message="Список пользователей пуст. Необходимо заполнить соответствующий раздел"
        type="info"
        show-icon
      />
    </a-form-model-item>
    <a-form-model-item
      has-feedback
      label="Устройство:"
      prop="deviceId"
    >
      <!-- TODO: possibilty to remove new device -->
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
    <a-form-model-item label="Документы:">
      <app-space direction="vertical">
        <app-image-previewer>
          <template #upload="{ handlePreview }">
            <a-upload
              multiple
              :file-list="fields.documents"
              @change="onDocumentChange"
              @preview="handlePreview"
            >
              <a-button>
                <a-icon type="plus" /> Добавить
              </a-button>
            </a-upload>
          </template>
        </app-image-previewer>
        <a-alert
          message="Размер загружаемого файла не должен превышать 10 МБ"
          type="info"
          show-icon
        />
      </app-space>
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
import FileService from '@/core/services/FileService'

export default {
  props: {
    users: {
      type: Array,
      default: () => []
    },
    devices: {
      type: Array,
      default: () => []
    },
    documents: {
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
        userId: null,
        deviceId: null,
        documents: [],
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

        if (this.documents.length) {
          this.fields.documents = this.documents.map(
            document => ({ uid: document.id, name: document.title, url: document.base64String })
          )
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
          ...this.fields,
          id: this.id,
          userId: this.userId,
          documents: this.fields.documents.map(
            document => ({
              title: document.name,
              base64String: document.url
            })
          )
        })
        .then(() => {
          this.$message.success('Тикет успешно сохранен')
          this.$emit('success')
        })
        .finally(() => {
          this.isSubmitRequestPending = false
        })
    },
    onDocumentChange ({ file: changedDocument }) {
      if (changedDocument.status === 'uploading') {
        FileService.fileToBase64(changedDocument.originFileObj)
          .then((base64String) => {
            this.fields.documents.push({ uid: changedDocument.uid, name: changedDocument.name, url: base64String })
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error('Error converting file to base64:', error)
          })
      }

      if (changedDocument.status === 'removed') {
        this.fields.documents.splice(
          this.fields.documents.findIndex(document => document.uid === changedDocument.uid), 1
        )
      }
    }
  }
}
</script>
