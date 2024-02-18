<template>
  <a-card title="Восстановление пароля">
    <template v-if="!resultVisible">
      <span>
        Для сброса пароля введите новый пароль.
      </span>
      <reset-password-form
        :class="$style.form"
        :user-id="userId"
        :code="code"
        @success="onSuccess"
      />
    </template>
    <a-result
      v-else
      status="success"
      sub-title="Новый пароль был успешно сохранён."
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
import ResetPasswordForm from '@/components/forms/account/ResetPasswordForm.vue'

export default {
  components: {
    ResetPasswordForm
  },
  props: {
    userId: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    }
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
    title: 'Сброс пароля'
  }
}
</script>

<style lang="less" module>
.form {
  margin-top: @padding-lg;
}
</style>
