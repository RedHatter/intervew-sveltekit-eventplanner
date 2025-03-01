<script lang="ts">
	import type { Event } from '$lib/server/remote-events';

	let { event }: { event: Event } = $props();
</script>

<h2 class="text-lg font-medium">{event.id}: {event.title}</h2>
<p class="text-base-content/70 text-sm mb-2">
	{new Intl.DateTimeFormat([], { dateStyle: 'short', timeStyle: 'short' }).format(
		new Date(event.date)
	)}
</p>
<p class="whitespace-pre-wrap mb-5">{event.description}</p>
