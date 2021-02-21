<template>
	<li :class="{ completed: todo.completed, editing: todo === editedTodo }">
		<div class="view">
			<input type="checkbox" v-model="todo.completed" />
			<label @dblclick="editTodo(todo)">{{ todo.title }}</label>
			<button @click="removeTodo(todo)">X</button>
		</div>
		<!-- 编辑待办输入框 -->
		<EditTodo
			class="edit"
			v-todo-focus="todo === editedTodo"
			v-model:toto-title="todo.title"
			@blur="doneEdit(todo)"
			@keyup.enter="doneEdit(todo)"
			@keyup.esc="cancelEdit(todo)"
		/>
	</li>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
	props: {
		todo: {
			type: Object,
			required: true,
		},
		editedTodo: Object,
	},
	emits: ['remove-todo', 'update:edited-todo'],
	setup(props, { emit }) {
		const state = reactive({
			beforeEditCache: '', // 缓存编辑前的title
		})
		// 删除待办
		function removeTodo(todo) {
			emit('remove-todo', todo)
		}
		// 双击编辑
		function editTodo(todo) {
			state.beforeEditCache = todo.title
			emit('update:edited-toto', todo)
		}

		// 取消待办
		function cancelEdit(todo) {
			todo.title = state.beforeEditCache
			emit('update:edited-toto', null)
		}

		// 完成编辑待办
		function doneEdit(todo) {
			emit('update:edited-toto', null)
		}
		return {
			...toRefs(state),
			removeTodo,
			editTodo,
			cancelEdit,
			doneEdit,
		}
	},
	directives: {
		// 自定义聚焦指令
		'todo-focus': (el, { value }) => {
			if (value) {
				el.focus()
			}
		},
	},
}
</script>

<style scoped>
.completed label {
	text-decoration: line-through;
}

.edit,
.editing .view {
	display: none;
}

.view,
.editing .edit {
	display: block;
}

</style>