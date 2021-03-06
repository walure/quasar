import { cssTransform } from '../../utils/dom'

export default {
  name: 'q-page-sticky',
  inject: ['layout'],
  props: {
    position: {
      type: String,
      default: 'bottom-right',
      validator: v => [
        'top-right', 'top-left',
        'bottom-right', 'bottom-left',
        'top', 'right', 'bottom', 'left'
      ].includes(v)
    },
    offset: {
      type: Array,
      validator: v => v.length === 2
    }
  },
  computed: {
    attach () {
      const pos = this.position

      return {
        top: pos.indexOf('top') > -1,
        right: pos.indexOf('right') > -1,
        bottom: pos.indexOf('bottom') > -1,
        left: pos.indexOf('left') > -1,
        vertical: pos === 'top' || pos === 'bottom',
        horizontal: pos === 'left' || pos === 'right'
      }
    },
    top () {
      return this.layout.offsetTop
    },
    right () {
      return this.layout.offsetRight
    },
    bottom () {
      return this.layout.offsetBottom
    },
    left () {
      return this.layout.offsetLeft
    },
    computedStyle () {
      const
        attach = this.attach,
        transforms = []

      if (attach.top && this.top) {
        transforms.push(`translateY(${this.top}px)`)
      }
      else if (attach.bottom && this.bottom) {
        transforms.push(`translateY(${-this.bottom}px)`)
      }

      if (attach.left && this.left) {
        transforms.push(`translateX(${this.left}px)`)
      }
      else if (attach.right && this.right) {
        transforms.push(`translateX(${-this.right}px)`)
      }

      const css = transforms.length
        ? cssTransform(transforms.join(' '))
        : {}

      if (this.offset) {
        css.margin = `${this.offset[1]}px ${this.offset[0]}px`
      }

      if (attach.vertical) {
        if (this.left) {
          css.left = `${this.left}px`
        }
        if (this.right) {
          css.right = `${this.right}px`
        }
      }
      else if (attach.horizontal) {
        if (this.top) {
          css.top = `${this.top}px`
        }
        if (this.bottom) {
          css.bottom = `${this.bottom}px`
        }
      }

      return css
    }
  },
  render (h) {
    console.log('sticky render')
    return h('div', {
      staticClass: 'q-page-sticky z-fixed',
      'class': `fixed-${this.position}`,
      style: this.computedStyle
    }, [
      this.$slots.default
    ])
  }
}
