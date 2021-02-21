<template>
  
  <input
    type="text"
    :value="totoTitle"
    @input="onInputChange"
    v-bind="$attrs"
  />
  
</template>

<script>
// import { reactive, toRefs } from 'vue'

export default {
  props: {
    totoTitle: {
      type: String,
      default: ''
    },
  },
  methods: {
    onInputChange(e) {
      this.$emit('update:totoTitle', e.target.value)
    }
  }
  // setup () {
  //   const state = reactive({
  //     count: 0,
  //   })
  
  //   return {
  //     ...toRefs(state),
  //   }
  // }
}
</script>

<style scoped>

</style>