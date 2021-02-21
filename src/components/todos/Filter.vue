<template>
	<div class="filters">
		<span
			v-for="item in items"
			:key="item.value"
			@click="$emit('update:modelValue', item.value)"
			:class="{ selected: modelValue === item.value }"
			>{{ item.label }}</span
		>
	</div>
</template>

<script>
export default {
	props: ['items', 'modelValue'],
	emits: ['update:modelValue'],
}
</script>

<style scoped>
.filters > span {
	padding: 2px 8px;
	margin-right: 10px;
	border: 1px solid transparent;
}

.filters > span.selected {
	border: 1px solid #ccc;
}
</style>