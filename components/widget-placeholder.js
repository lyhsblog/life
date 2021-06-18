
/**
 * @file placeholder
 * @description render placeholder or data
 * @author Surmon <https://github.com/surmon-china>
 */

import Empty from './widget-empty.vue'
import Spin from './widget-spin.vue'
import Vue from "vue";
/**
 * @example
 *  <placeholder :loading="false" :data="data.length" p-i18n-key="LANGUAGE_KEYS.XXX">
 *    <component />
 *  </placeholder>
 * @example
 *  <placeholder :loading="false" :data="data.length" placeholder="empty">
 *    <component />
 *  </placeholder>
 * @example
 *  <placeholder :loading="true" :data="data.length">
 *    <template #loading> skeleton </template>
 *    <template #placeholder> placeholder </template>
 *    <template #default> <component /> </template>
 *  </placeholder>
 */
const Events = {
  AfterEnter: 'after-enter'
}
export default {
  name: 'Placeholder',
  props: {
    data: {
      type: [Array, Object, Boolean, Number],
      default: undefined
    },
    transition: {
      type: Boolean,
      default: true
    },
    transitionName: {
      type: String,
      default: 'module'
    },
    placeholder: String,
    pI18nKey: String,
    loading: Boolean,
  },
  emits: [
    Events.AfterEnter
  ],
  render: function (createElement) {
    const { data, transition, transitionName, placeholder, pI18nKey, loading } = this.$props
    const isEmptyData = data !== undefined && (
      (Array.isArray(data) && !data.length) ||
      !data
    )

    const getPlaceholderView = () => {
      return (placeholder || pI18nKey)
        ? Vue.component('empty', {
          render: function (createElement) {
            return createElement(Empty, {
                props: { placeholder, i18nKey: pI18nKey }
              }
            )
          }
        })
        : this.$slots.placeholder
    }

    const getDataView = () => {
      return isEmptyData
        ? getPlaceholderView()
        : this.$slots.default
    }

    const getLoadingView = () => {
      return (
        this.$slots.loading ||
        Vue.component('spin', {
          render: function (createElement) {
            return createElement(Spin, {
                props: { loading: true }
              }
            )
          }
        })
      )
    }

    const getView = () => {
      return loading
        ? getLoadingView()
        : getDataView()
    }

    // if (transition) {
    //   return Vue.component('my-transition', {
    //     functional: true,
    //     render: function (createElement, context) {
    //       var data = {
    //         props: {
    //           name: transitionName,
    //           mode: 'out-in'
    //         },
    //         on: {
    //           beforeEnter: function (el) {
    //             // ...
    //           },
    //           afterEnter: function (...el) {
    //             context.emit(Events.AfterEnter, ...el)
    //           }
    //         }
    //       }
    //       return createElement('transition', data, getView())
    //     }
    //   })
    // }

    return getView()
  }
}
