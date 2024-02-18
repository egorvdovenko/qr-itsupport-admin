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
      <a-input
        v-model="fields.email"
        autocomplete="off"
      />
    </a-form-model-item>
    <a-form-model-item
      has-feedback
      label="Пароль:"
      prop="password"
    >
      <a-input
        v-model="fields.password"
        autocomplete="off"
        type="password"
      />
    </a-form-model-item>
    <a-form-model-item
      has-feedback
      label="Подтвердите пароль:"
      prop="checkPassword"
    >
      <a-input
        v-model="fields.checkPassword"
        autocomplete="off"
        type="password"
      />
    </a-form-model-item>
    <a-button
      html-type="submit"
      type="primary"
      :loading="isSubmitRequestPending"
    >
      Зарегистрироваться
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
        password: null,
        checkPassword: null
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
        password: [{ validator: this.validatePassword, trigger: 'change' }],
        checkPassword: [
          { validator: this.validateCheckPassword, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.isSubmitRequestPending = true
          this.$api.accountController
            .registration(this.fields)
            .then(() => {
              this.$emit('success')
            })
            .finally(() => {
              this.isSubmitRequestPending = false
            })
        } else {
          this.$message.warning('Некоторые поля заполнены неверно')
          return false
        }
      })
    },
    validatePassword (rule, value, callback) {
      if (!value) {
        callback(new Error('Поле является обязательным для заполнения'))
      } else {
        if (this.fields.checkPassword) {
          this.$refs.form.validateField('checkPassword')
        }
        callback()
      }
    },
    validateCheckPassword (rule, value, callback) {
      if (!value) {
        callback(new Error('Поле является обязательным для заполнения'))
      } else if (value !== this.fields.password) {
        callback(new Error('Пароли не совпадают'))
      } else {
        callback()
      }
    }
  }
}
</script>
