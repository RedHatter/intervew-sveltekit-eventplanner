<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	let deleting = $state(false);

	let { data }: { data: PageData } = $props();
</script>

<div>
	{#await data.event}
		<span class="loading loading-dots"></span>
	{:then event}
		{#if event}
			<h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
			<p>{event.description}</p>
			<p>{event.date}</p>

			<a class="btn" href="/{event.id}/edit" role="button">Edit Event</a>

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
				<button disabled={deleting} type="submit">
					Delete Event

					{#if deleting}
						<span class="loading loading-spinner loading-xs"></span>
					{/if}
				</button>
			</form>
		{/if}
	{/await}
</div>
