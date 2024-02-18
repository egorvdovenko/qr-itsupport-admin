<template>
  <a-config-provider :locale="locale">
    <a-layout>
      <a-layout-header>
        <a-row
          type="flex"
          justify="space-between"
          align="middle"
        >
          <a-col>
            <nuxt-link
              to="/"
              :class="$style.title"
            >
              <a-icon
                type="control"
                theme="filled"
              />
              QRТехподдержка
            </nuxt-link>
          </a-col>
          <a-col>
            <a-menu
              v-model="menuModel"
              theme="dark"
              mode="horizontal"
              :class="$style.menu"
            >
              <a-menu-item
                key="logout"
                @click="logout"
              >
                <a-icon type="import" />
                Выйти
              </a-menu-item>
            </a-menu>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout>
        <a-layout-sider
          theme="light"
          width="250"
        >
          <the-menu :list-items="sidebarListItems" />
        </a-layout-sider>
        <a-layout :class="$style.contentLayout">
          <the-breadcrumb />
          <a-layout-content>
            <nuxt :nuxt-child-key="$route.path" />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<script>
import locale from 'ant-design-vue/es/locale/ru_RU'
import moment from 'moment'
import TheMenu from '@/components/TheMenu.vue'
import TheBreadcrumb from '@/components/TheBreadcrumb.vue'

moment.locale('ru')

export default {
  components: {
    TheMenu,
    TheBreadcrumb
  },
  data () {
    return {
      locale,
      menuModel: this.getMenuModel(),
      sidebarListItems: [
        {
          title: 'Настройки',
          children: [
            {
              title: 'Устройства',
              link: '/settings/devices'
            }
          ]
        }
      ]
    }
  },
  watch: {
    '$route.name' () {
      this.menuModel = this.getMenuModel()
    }
  },
  methods: {
    getMenuModel () {
      if (this.$route.name === 'ProfileEdit') {
        return ['profile']
      }
      return []
    },
    logout () {
      this.$tokenAuth.logout().then(() => {
        this.$router.push({
          name: 'Login'
        })
      })
    }
  }
}
</script>

<style lang="less" module>
.title {
  color: @white;
  font-size: @heading-4-size;
  line-height: @line-height-base;
}

.menu {
  margin-left: 32px;
  line-height: 64px;
}

.contentLayout {
  min-height: calc(100vh - @layout-header-height);
  padding: 0 @padding-lg @padding-lg;
}
</style>
