<script lang="ts">
	import EventForm from '$lib/components/EventForm.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div>
	{#await data.event}
		<span class="loading loading-dots"></span>
	{:then event}
		<EventForm defaultValues={event} />
	{/await}
</div>
