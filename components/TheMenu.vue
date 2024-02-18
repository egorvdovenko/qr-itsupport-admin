<template>
  <a-menu
    v-model="menuModel"
    :class="$style.root"
    mode="inline"
  >
    <template v-for="item in list">
      <a-menu-item
        v-if="!item.children"
        :key="item.key"
      >
        <a-icon
          v-if="item.iconType"
          :type="item.iconType"
        />
        <template v-if="item.link || item.externalLink">
          <nuxt-link
            v-if="item.link"
            :to="item.link"
          >
            {{ item.title }}
          </nuxt-link>
          <a
            v-else
            :href="item.externalLink"
          >{{ item.title }}</a>
        </template>
        <span v-else>
          {{ item.title }}
        </span>
      </a-menu-item>
      <sub-menu
        v-else
        :key="item.key"
        :menu-item="item"
      />
    </template>
  </a-menu>
</template>

<script>
import Vue from 'vue'
import { Menu } from 'ant-design-vue'

export default {
  components: {
    // eslint-disable-next-line vue/component-definition-name-casing
    SubMenu: Vue.component('sub-menu', {
      props: {
        ...Menu.SubMenu.props,
        menuItem: {
          type: Object,
          default: () => ({})
        }
      },
      render () {
        function checkIcon (item) {
          if (item.iconType) {
            return <a-icon type={item.iconType} />
          }
        }
        function checkLink (item) {
          if (item.link || item.externalLink) {
            if (item.link) {
              return <nuxt-link to={item.link}>{item.title}</nuxt-link>
            } else {
              return <a href={item.externalLink}>{item.title}</a>
            }
          } else {
            return <span>{item.title}</span>
          }
        }
        return (
          <a-sub-menu
            key={this.menuItem.key}
            {...{ props: this.$props }}
            on={this.$listeners}
          >
            <template slot="title">
              {checkIcon(this.menuItem)}
              {checkLink(this.menuItem)}
            </template>
            {this.menuItem.children.map((child) => {
              if (!child.children) {
                return (
                  <a-menu-item key={child.key}>
                    {checkIcon(child)}
                    {checkLink(child)}
                  </a-menu-item>
                )
              } else {
                return <sub-menu key={child.key} menu-item={child} />
              }
            })}
          </a-sub-menu>
        )
      }
    })
  },
  props: {
    listItems: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      menuModel: this.getMenuModel(),
      list: this.getList()
    }
  },
  watch: {
    '$route.name' () {
      this.menuModel = this.getMenuModel()
    }
  },
  methods: {
    getList (items = this.listItems, key) {
      const list = []

      items.forEach((item, i) => {
        if (item.children) {
          item.children = this.getList(item.children, i)
        }

        list.push({
          key: key ? `${key}.${i}` : i,
          ...item
        })
      })

      return list
    },
    getMenuModel (items = this.listItems, key) {
      let menuModel = []

      items.forEach((item, i) => {
        if (item.link === this.$route.path) {
          menuModel.push(key ? `${key}.${i}` : i)
        } else if (item.children && !menuModel.length) {
          menuModel = this.getMenuModel(item.children, i)
        }
      })

      return menuModel
    }
  }
}
</script>

<style lang="less" module>
.root {
  min-height: 100%;
}
</style>
