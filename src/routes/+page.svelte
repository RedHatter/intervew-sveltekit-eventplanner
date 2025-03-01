<script lang="ts">
	import type { PageData } from './$types';

	import EventView from '$lib/components/EventView.svelte';

	let { data }: { data: PageData } = $props();
</script>

<h1 class="text-3xl mb-6 text-center">Events</h1>

{#await data.events}
	<span class="loading loading-dots block mb-5"></span>
{:then events}
	{#each events as event}
		<a class="block hover:opacity-50" href="/{event.id}">
			<EventView {event} />
		</a>
	{/each}
{/await}

<a class="btn btn-primary" href="/newevent">Add Event</a>
