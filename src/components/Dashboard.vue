<template>
	<ul>
		<li>
			<!-- <router-link to="/">dashboard</router-link> -->
			<NavLink to="/"></NavLink>
		</li>
		<li>
			<!-- <router-link to="/about">about</router-link> -->
			<NavLink to="/about"></NavLink>
		</li>
		<li>
			<!-- <router-link to="/todos">todos</router-link> -->
			<NavLink to="/todos"></NavLink>
		</li>
	</ul>
</template>

<script>
import NavLink from './NavLink.vue';
export default {
	components: {
		NavLink,
	},
}
</script>

<style scoped>
</style>