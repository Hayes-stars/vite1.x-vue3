/**
 * 组件逻辑提取 缓存操作
 */

import {ref, watchEffect} from 'vue'
// 缓存操作
const todoStorage = {
	fetch() {
		let todos = JSON.parse(localStorage.getItem('vue3-todos')) || []
		todos.forEach((todo, index) => {
			todo.id = index + 1
		})
		return todos
	},
	save(todos) {
		localStorage.setItem('vue3-todos', JSON.stringify(todos))
	},
}

export function useTodos(state) {

  const todos = ref(todoStorage.fetch())
  
		// 新增待办
		function addTodo() {
			todos.value.push({
				id: todos.value.length + 1,
				title: state.newTodo,
				completed: false,
			})
			state.newTodo = ''
			console.log(todos)
		}
		// 删除待办
		function removeTodo(todo) {
			console.log('removeTodo', todo)
			todos.value.splice(todos.value.indexOf(todo), 1)
		}

		watchEffect(() => {
			todoStorage.save(todos.value)
    })
    return {todos, removeTodo, addTodo}
}