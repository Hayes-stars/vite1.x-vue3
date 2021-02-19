<template>
  <div @click="$emit('update:counter', counter+1)">
    counter: {{counter}}
  </div>
</template>

<script>
  export default {
    props: {
      // modelValue: {
      //   type: Number,
      //   default: 0
      // },
      counter: {
        type: Number,
        default: 0
      },
    },
  }
</script>

<style scoped>

</style>