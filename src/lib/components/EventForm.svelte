<script lang="ts">
	import type { Event } from '$lib/server/remote-events';
	import { enhance } from '$app/forms';
	import TextField from './TextField.svelte';
	import TextArea from './TextArea.svelte';
	import { onMount } from 'svelte';

	const iso = new Date().toISOString();
	const min = iso.substring(0, iso.lastIndexOf(':'));

	let disabled = $state(false);

	// Only set "novalidate" on the form when javascript is enabled leaving the
	// default browser validation functional for users with javascript disabled.
	let novalidate = $state(false);

	onMount(() => {
		novalidate = true;
	});

	let { defaultValues }: { defaultValues?: Partial<Event> } = $props();
</script>

<form
	class="flex flex-col items-start"
	{novalidate}
	method="POST"
	use:enhance={({ formElement, cancel }) => {
		if (!formElement.checkValidity()) {
			cancel();
			return;
		}

		disabled = true;

		return async ({ update }) => {
			await update();
			disabled = false;
		};
	}}
>
	<!-- form for creating or editing an event -->

	<TextField
		label="Title"
		value={defaultValues?.title}
		{disabled}
		type="text"
		name="title"
		placeholder="Example title"
		required
	/>

	<TextArea
		label="Description"
		value={defaultValues?.description}
		{disabled}
		name="description"
		placeholder="Full event description"
	/>

	<TextField
		label="Date"
		value={defaultValues?.date}
		{disabled}
		type="datetime-local"
		name="date"
		required
		{min}
	/>

	<div class="flex gap-2">
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

		<a class="btn" href="./">Back</a>
	</div>
</form>
