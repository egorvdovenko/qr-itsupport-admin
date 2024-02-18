<template>
  <a-card title="Восстановление пароля">
    <template v-if="!resultVisible">
      <span>
        Для восстановления пароля введите свой адрес электронной почты.
      </span>
      <restore-password-form
        :class="$style.form"
        @success="onSuccess"
      />
    </template>
    <a-result
      v-else
      status="success"
      sub-title="На указанный адрес электронной почты отправлено письмо с инструкцией по восстановлению пароля."
    >
      <template #extra>
        <a-button
          key="login"
          type="primary"
          @click="$router.push({ name: 'Login' })"
        >
          Вернуться
        </a-button>
      </template>
    </a-result>
  </a-card>
</template>

<script>
import RestorePasswordForm from '@/components/forms/account/RestorePasswordForm.vue'

export default {
  components: {
    RestorePasswordForm
  },
  data () {
    return {
      resultVisible: false
    }
  },
  methods: {
    onSuccess () {
      this.resultVisible = true
    }
  },
  head: {
    title: 'Восстановление пароля'
  }
}
</script>

<style lang="less" module>
.form {
  margin-top: @padding-lg;
}
</style>
