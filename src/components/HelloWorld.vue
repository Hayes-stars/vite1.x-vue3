<template>
	<h1>{{ msg }}</h1>
	<button @click="count++">count is: {{ count }}</button>
	<p>
		Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
	</p>

	<!-- 传送门 Teleport: ModelButton -->
	<ModalButton></ModalButton>

	<!-- Emits选项 -->
	<Emits @click="onClick"></Emits>

	<!-- 实例方法定义组件 -->
	<comp></comp>

	<!-- v-model 的使用 -->
	<!-- <VmodelTest v-model="counter"></VmodelTest> -->
	<VmodelTest v-model:counter="counter"></VmodelTest>
	<!-- 等效于 -->
	<!-- <VmodelTest :counter="counter" @update:counter="counter=$event"></VmodelTest> -->
	<RenderTest v-model:counter="counter">
		<template v-slot:default>title</template>
		<template v-slot:content>content......</template>
	</RenderTest>

	<!-- 函数式组件 -->
	<Functional level="3">这是一个动态的h元素</Functional>

	<!-- 异步组件 -->
	<AsyncComp></AsyncComp>

	<!-- 自定义指令 -->
	<p v-highlight="'green'">highlight this next!!!</p>

	<!-- transition test -->
	<TransitionTest></TransitionTest>

	<!-- 编程方式发送和监听事件 -->
	<button @click="sendMsg">send message</button>
</template>

<script>
import { h, defineAsyncComponent } from 'vue'
import ModalButton from './ModalButton.vue'
import Emits from './Emits.vue'
import VmodelTest from './VmodelTest.vue'
import Functional from './Functional.vue'
import TransitionTest from './TransitionTest.vue'

// 事件派发和监听
import mitt from 'mitt'
export const emitter = mitt()


export default {
	name: 'HelloWorld',
	props: {
		msg: String,
	},
	components: {
		ModalButton,
		Emits,
		VmodelTest,
		Functional,
		// 异步组件
		AsyncComp: defineAsyncComponent(() => import('./NextPage.vue')),
		TransitionTest,
		RenderTest: {
			props: {
				counter: {
					type: Number,
					default: 0,
				},
			},
			render() {
				// this.$scopedSlots.content()  vue3废除
				this.$slots.default()
				this.$slots.content()
				const self = this
				return h('div', [
					h('div', { onClick: this.onClick }, [
            `I am RenderTest: ${self.counter}`,
            this.$slots.default(),
            this.$slots.content()

					]),
				])
			},
			methods: {
				onClick() {
					this.$emit('update:counter', this.counter + 1)
				},
			},
		},
	},
	data() {
		return {
			count: 0,
			counter: 1,
		}
	},
	methods: {
		onClick() {
			console.log('click me')
		},
		sendMsg() {
			console.log('sendMsg')
			emitter.emit('someEvent', 'balabala')
		}
	},
}
</script>
