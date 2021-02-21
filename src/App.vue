<template>
	<img alt="Vue logo" src="./assets/logo.png" />
	<!-- 传统写法 -->
	<p @click="$store.commit('add')">{{$store.state.count}}</p>
	<!-- composition写法 -->
	<p @click="add">{{count}}</p>
	<!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
	<!-- <p>{{counter}}</p>
  <p>{{doubleCounter}}</p>
  <p ref="desc"></p> -->
	<!-- <Todos></Todos> -->
	<router-view></router-view>
  <!-- 下面写法与vite-内有冲突 -->
	<!-- <router-view v-slot="{ Component }">
		<keep-alive>
			<component :is="Component"></component>
		</keep-alive>
	</router-view> -->
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Todos from './components/todos/Todos.vue'
import {useStore} from 'vuex'
import { toRefs } from 'vue'
// import {computed, reactive, onMounted, onUnmounted, ref, toRefs, watch} from 'vue'
export default {
	name: 'App',
	components: {
		HelloWorld,
		Todos,
	},
	props: {
		msg: String,
	},
	setup() {		
		const store = useStore()
		console.log(store);
		return {
			...toRefs(store.state),
			// state: store.state,
			add() {
				store.commit('add')
			}
		}
		// counter 相关
		// const data = reactive({
		//   counter: 1,
		//   doubleCounter: computed(() => data.counter*2)
		// })
		// let timer
		// onMounted(() => {
		//   timer = setInterval(() => {
		//     data.counter++
		//   }, 1000)
		// })
		// onUnmounted(() => {
		//   clearInterval(timer)
		// })
		// const {counter, doubleCounter} = useCounter()
		// const msg2 = ref('some message')
		// // 使用元素的引用
		// const desc = ref(null)
		// // 监听器
		// watch(counter, (val, oldVal) => {
		//   const domP = desc.value
		//   domP.textContent = `counter change from ${oldVal} to ${val}`
		// })
		// return {counter, doubleCounter, msg2, desc}
	},
}
// function useCounter() {
//   const data = reactive({
//     counter: 1,
//     doubleCounter: computed(() => data.counter*2)
//   })

//   let timer
//   onMounted(() => {
//     timer = setInterval(() => {
//       data.counter++
//     }, 1000)
//   })
//   onUnmounted(() => {
//     clearInterval(timer)
//   })
//   return toRefs(data)
// }
</script>
