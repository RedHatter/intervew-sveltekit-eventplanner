<script lang="ts">
	import type { Event } from '$lib/server/remote-events';
	import { enhance } from '$app/forms';

	const iso = new Date().toISOString();
	const min = iso.substring(0, iso.lastIndexOf(':'));

	let disabled = $state(false);

	let { defaultValues }: { defaultValues?: Partial<Event> } = $props();
</script>

<form
	class="flex flex-col items-start"
	method="POST"
	use:enhance={() => {
		disabled = true;

		return async ({ update }) => {
			await update();
			disabled = false;
		};
	}}
>
	<!-- form for creating or editing an event -->

	<label class="font-medium mb-2" for="title">Title</label>
	<input
		class="input input-ghost w-full mb-5"
		value={defaultValues?.title ?? ''}
		{disabled}
		type="text"
		id="title"
		name="title"
		placeholder="Example title"
		required
	/>

	<label class="font-medium mb-2" for="description">Description</label>
	<textarea
		class="textarea textarea-ghost w-full mb-5"
		value={defaultValues?.description}
		{disabled}
		id="description"
		name="description"
		rows="3"
		cols="50"
		placeholder="Example providing more descriptive details"
	></textarea>

	<label class="font-medium mb-2" for="date">Date</label>
	<input
		class="input input-ghost w-full mb-5"
		value={defaultValues?.date}
		{disabled}
		type="datetime-local"
		id="date"
		name="date"
		required
		{min}
	/>

	<button class="btn btn-primary" {disabled} type="submit">
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
