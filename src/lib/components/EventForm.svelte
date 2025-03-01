<script lang="ts">
	import type { Event } from '$lib/server/remote-events';
	import { enhance } from '$app/forms';

	const iso = new Date().toISOString();
	const min = iso.substring(0, iso.lastIndexOf(':'));

	let disabled = $state(false);

	let { defaultValues }: { defaultValues?: Partial<Event> } = $props();
</script>

<form
	method="POST"
	use:enhance={() => {
		disabled = true;

		return async ({ update }) => {
			await update();
			disabled = false;
		};
	}}
>
	<!-- form for creating new event -->
	<label for="title">Title</label>
	<input value={defaultValues?.title} {disabled} type="text" id="title" name="title" required />

	<textarea
		value={defaultValues?.description}
		{disabled}
		id="description"
		name="description"
		rows="4"
		cols="50"
		placeholder="Description"
	></textarea>

	<label for="date">Date</label>
	<input
		value={defaultValues?.date}
		{disabled}
		type="datetime-local"
		id="date"
		name="date"
		required
		{min}
	/>

	<button {disabled} type="submit">
		{#if defaultValues === undefined}
			Create Event
		{:else}
			Update Event
		{/if}

		{#if disabled}
			<span class="loading loading-spinner loading-xs"></span>
		{/if}
	</button>
</form>
