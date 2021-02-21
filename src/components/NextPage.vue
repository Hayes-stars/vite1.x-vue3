<template>
  <div>
    this is next-page.
  </div>
</template>

<script>
  import { emitter } from './HelloWorld.vue'
  export default {
    mounted () {      
      emitter.on('someEvent', msg => {
        console.log('emitter msg', msg)
      })
    },
  }
</script>

<style scoped>

</style>