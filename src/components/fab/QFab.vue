<template>
  <div
    class="q-fab z-fab row inline justify-center"
    :class="{'q-fab-opened': opened}"
  >
    <q-btn
      @click="toggle"
      round
      :outline="outline"
      :push="push"
      :flat="flat"
      :color="color"
      :class="{glossy: glossy}"
    >
      <slot name="tooltip"></slot>
      <q-icon :name="icon" class="q-fab-icon absolute-full row flex-center full-width full-height"></q-icon>
      <q-icon :name="activeIcon" class="q-fab-active-icon absolute-full row flex-center full-width full-height"></q-icon>
    </q-btn>
    <div class="q-fab-actions flex no-wrap inline items-center" :class="`q-fab-${direction}`">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { QBtn } from '../btn'
import { QIcon } from '../icon'
import FabMixin from './fab-mixin'
import ModelToggleMixin from '../../utils/mixin-model-toggle'

export default {
  name: 'q-fab',
  mixins: [FabMixin, ModelToggleMixin],
  components: {
    QBtn,
    QIcon
  },
  props: {
    icon: {
      type: String,
      default: 'add'
    },
    activeIcon: {
      type: String,
      default: 'close'
    },
    direction: {
      type: String,
      default: 'right'
    }
  },
  provide () {
    return {
      __qFabClose: this.close
    }
  },
  data () {
    return {
      opened: false
    }
  },
  methods: {
    open () {
      this.opened = true
      this.__updateModel(true)
      this.$emit('open')
    },
    close (fn) {
      this.opened = false
      this.__updateModel(false)
      this.$emit('close')

      if (typeof fn === 'function') {
        fn()
      }
    },
    toggle () {
      if (this.opened) {
        this.close()
      }
      else {
        this.open()
      }
    }
  }
}
</script>
