<template>
  <a-form-model
    ref="form"
    layout="vertical"
    :model="fields"
    :rules="rules"
    @submit.prevent="onSubmit"
  >
    <a-form-model-item
      has-feedback
      label="Адрес электронной почты:"
      prop="email"
    >
      <a-input v-model="fields.email" />
    </a-form-model-item>
    <a-form-model-item
      has-feedback
      label="Пароль:"
      prop="password"
    >
      <a-input
        v-model="fields.password"
        type="password"
      />
    </a-form-model-item>
    <a-button
      type="primary"
      html-type="submit"
      :loading="isSubmitRequestPending"
    >
      Войти
    </a-button>
  </a-form-model>
</template>

<script>
export default {
  data () {
    return {
      isSubmitRequestPending: false,
      fields: {
        email: null,
        password: null
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Поле является обязательным для заполнения',
            trigger: 'change'
          },
          {
            type: 'email',
            message: 'Некорректный адрес электронной почты',
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            message: 'Поле является обязательным для заполнения',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.isSubmitRequestPending = true
          this.$tokenAuth
            .login({ data: this.fields })
            .then(() => {
              this.$emit('success')
            })
            .catch(() => {
              this.$message.error('Неправильно указан логин или пароль')
            })
            .finally(() => {
              this.isSubmitRequestPending = false
            })
        } else {
          this.$message.warning('Некоторые поля заполнены неверно')
          return false
        }
      })
    }
  }
}
</script>
