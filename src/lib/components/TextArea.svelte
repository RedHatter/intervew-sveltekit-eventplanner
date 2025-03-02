<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	let { value, label, id, name, required, ...rest }: HTMLTextareaAttributes & { label: string } =
		$props();
</script>

<label class="font-medium mb-2" for={id ?? name}>
	Description
	{#if !required}
		<span class="font-normal text-xs">(Optional)</span>
	{/if}
</label>

<label class="textarea w-full mb-5">
	<div class=" relative w-full">
		<textarea class="absolute inset-0" bind:value id={id ?? name} {name} {required} {...rest}
		></textarea>
		<div class="invisible whitespace-pre-wrap break-words">{value}&nbsp;</div>
	</div>
</label>
