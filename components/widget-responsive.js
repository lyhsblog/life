/**
 * @file responsive
 * @description Render on desktop platform or mobile platform
 * @author Surmon <https://github.com/surmon-china>
 */

/* eslint-disable vue/one-component-per-file */

/**
 * @example <responsive desktop><component /></responsive>
 * @example <responsive mobile><component /></responsive>
 * @example <responsive both><component /></responsive>
 * @example
 *  <responsive>
 *    <template #desktop>Desktop</template>
 *    <template #mobile>Mobile</template>
 *  </responsive>
*/
export default {
  name: 'Responsive',
  render(createElement) {
    return this.$slots.default
  },
}
