<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	import EventView from '$lib/components/EventView.svelte';

	let deleting = $state(false);

	let { data }: { data: PageData } = $props();
</script>

<div>
	{#await data.event}
		<span class="loading loading-dots"></span>
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
			</div>
		{/if}
	{/await}
</div>
