<template>
	<div>
		<!-- 新增todo -->
		<EditTodo
			v-model:toto-title="newTodo"
			@keyup.enter="addTodo"
			autofocus
			placeholder="新增今日待办"
			autocomplete="off"
		/>
		<!-- todo列表 -->
		<ul>
			<TodoItem
				v-for="todo in filterTodos"
				:key="todo.id"
				:todo="todo"
				v-model:edited-todo="editedTodo"
				@remove-todo="removeTodo(todo)"
			/>

			<!-- 抽取组件前的 -->
			<!-- <li
				:class="{ completed: todo.completed, editing: todo === editedTodo }"
				v-for="todo in filterTodos"
				:key="todo.id"
			>
				<div class="view">
					<input type="checkbox" v-model="todo.completed" />
					<label @dblclick="editTodo(todo)">{{ todo.title }}</label>
					<button @click="removeTodo(todo)">X</button>
				</div>
				<EditTodo
					class="edit"
          v-todo-focus="todo === editedTodo"
					v-model:toto-title="todo.title"
					@blur="doneEdit(todo)"
					@keyup.enter="doneEdit(todo)"
					@keyup.esc="cancelEdit(todo)"
				/>
			</li> -->
		</ul>
		<!-- 过滤 -->
		<Filter :items="filterItems" v-model="visibility"></Filter>
		<!-- <div class="filters">
			<span
				@click="visibility = 'all'"
				:class="{ selected: visibility === 'all' }"
				>All</span
			>
			<span
				@click="visibility = 'active'"
				:class="{ selected: visibility === 'active' }"
				>Active</span
			>
			<span
				@click="visibility = 'completed'"
				:class="{ selected: visibility === 'completed' }"
				>Completed</span
			>
		</div> -->
	</div>
</template>

<script>
import TodoItem from './TodoItem.vue'
import Filter from './Filter.vue'
import { reactive, toRefs } from 'vue'
import {useTodos} from './useTodos';
import {useFilter} from './useFilter';

export default {
	components: {
		TodoItem,
		Filter,
	},
	setup() {
		const todoState = reactive({
			newTodo: '',
			editedTodo: null, // 正在编辑的todo项
		})
		const {todos, addTodo, removeTodo} = useTodos(todoState)
		const filterState = useFilter(todos)

		return {
			...toRefs(todoState),
			...toRefs(filterState),
			addTodo,
			removeTodo
		}
	},
}
</script>

<style scoped>
</style>