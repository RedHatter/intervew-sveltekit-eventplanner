<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	import EventView from '$lib/components/EventView.svelte';
	import EventViewLoader from '$lib/components/EventViewLoader.svelte';

	let deleting = $state(false);

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	{#await data.event}
		<title>Loading...</title>
	{:then event}
		<title>{event?.title}</title>
	{/await}
</svelte:head>

<div>
	{#await data.event}
		<EventViewLoader />

		<a class="btn" href="./">Back</a>
	{:then event}
		{#if event}
			<EventView {event} />

			<div class="flex gap-2">
				<a class="btn btn-primary" href="/{event.id}/edit">Edit Event</a>

				<form
					method="POST"
					use:enhance={() => {
						deleting = true;

						return async ({ update }) => {
							await update();
							deleting = false;
						};
					}}
				>
					<button class="btn" disabled={deleting} type="submit">
						Delete Event

						{#if deleting}
							<span class="loading loading-spinner loading-xs"></span>
						{/if}
					</button>
				</form>

				<a class="btn" href="./">Back</a>
			</div>
		{/if}
	{/await}
</div>
