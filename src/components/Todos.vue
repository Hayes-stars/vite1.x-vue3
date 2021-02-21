<template>
	<div>
		<!-- 新增todo -->
		<input
			type="text"
			name=""
			id=""
			v-model="newTodo"
			@keyup.enter="addTodo"
			autofocus
			placeholder="新增今日待办"
			autocomplete="off"
		/>
		<!-- todo列表 -->
		<ul>
			<li
				:class="{ completed: todo.completed, editing: todo === editedTodo }"
				v-for="todo in filterTodos"
				:key="todo.id"
			>
				<div class="view">
					<input type="checkbox" v-model="todo.completed" />
					<label @dblclick="editTodo(todo)">{{ todo.title }}</label>
					<button @click="removeTodo(todo)">X</button>
				</div>
				<!-- 编辑待办输入框 -->
				<input
					type="text"
					class="edit"
					v-model="todo.title"
          v-todo-focus="todo === editedTodo"
					@blur="doneEdit(todo)"
					@keyup.enter="doneEdit(todo)"
					@keyup.esc="cancelEdit(todo)"
				/>
			</li>
		</ul>
    <!-- 过滤 -->
    <div class="filters">
      <span @click="visibility = 'all'" :class="{selected: visibility === 'all'}">All</span>
      <span @click="visibility = 'active'" :class="{selected: visibility === 'active'}">Active</span>
      <span @click="visibility = 'completed'" :class="{selected: visibility === 'completed'}">Completed</span>
    </div>
	</div>
</template>

<script>
import { reactive, toRefs, computed, watchEffect } from 'vue'
const filters = {
  all(todos){
    return todos
  },
  active(todos){
    return todos.filter(todo => !todo.completed)
  },
  completed(todos){
    return todos.filter(todo => todo.completed)
  }
}

// 缓存操作
const todoStorage = {
  fetch(){
    let todos = JSON.parse(localStorage.getItem('vue3-todos')) || []
    todos.forEach((todo, index) => {
      todo.id = index +1
    });
    return todos
  },
  save(todos){
    localStorage.setItem('vue3-todos', JSON.stringify(todos))
  }
}

export default {
	setup() {
		const state = reactive({
			newTodo: '',
			todos: todoStorage.fetch(),
			beforeEditCache: '', // 缓存编辑前的title
      editedTodo: null, // 正在编辑的todo项
      visibility: 'all', 
      filterTodos: computed(() => {
        return filters[state.visibility](state.todos)
      })
		})
		// 新增待办
		function addTodo() {
			state.todos.push({
				id: state.todos.length + 1,
				title: state.newTodo,
				completed: false,
			})
			state.newTodo = ''
			console.log(state.todos)
		}
		// 删除待办
		function removeTodo(todo) {
			console.log('removeTodo', todo)
			state.todos.splice(state.todos.indexOf(todo), 1)
		}
		// 双击编辑
		function editTodo(todo) {
			state.beforeEditCache = todo.title
			state.editedTodo = todo
		}

		// 取消待办
		function cancelEdit(todo) {
			todo.title = state.beforeEditCache
			state.editedTodo = null
		}

		// 完成编辑待办
		function doneEdit(todo) {
			state.editedTodo = null
    }
    
    watchEffect(() => {
      todoStorage.save(state.todos)
    })

		return {
			...toRefs(state),
			addTodo,
			removeTodo,
			editTodo,
			cancelEdit,
			doneEdit,
		}
  },
  directives: {
    // 自定义聚焦指令
    'todo-focus': (el, {value}) => {
      if (value) {
        el.focus()
      }
    }
  }
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

.filters > span {
  padding: 2px 8px;
  margin-right: 10px;
  border: 1px solid transparent;
}

.filters > span.selected {
  border: 1px solid #ccc;
}
</style>