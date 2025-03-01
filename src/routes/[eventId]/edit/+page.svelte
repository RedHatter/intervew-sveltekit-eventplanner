<script lang="ts">
	import EventForm from '$lib/components/EventForm.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div>
	{#await data.event}
		<div class="animate-pulse mb-5">
			<div class="h-6 w-9 rounded-md bg-base-300 mb-2"></div>
			<div class="h-10 w-full rounded-md bg-base-300 mb-5"></div>
			<div class="h-6 w-22 rounded-md bg-base-300 mb-2"></div>
			<div class="h-20 w-full rounded-md bg-base-300 mb-5"></div>
			<div class="h-6 w-9 rounded-md bg-base-300 mb-2"></div>
			<div class="h-10 w-full rounded-md bg-base-300 mb-5"></div>

			<a class="btn" href="./">Back</a>
		</div>
	{:then event}
		<EventForm defaultValues={event} />
	{/await}
</div>
