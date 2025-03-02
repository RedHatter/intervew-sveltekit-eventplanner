<script lang="ts">
	import type { EventHandler, HTMLInputAttributes } from 'svelte/elements';

	let errorMsg = $state<string | undefined>(undefined);

	let updateErrorMsg: EventHandler<Event, HTMLInputElement> = (e) =>
		(errorMsg = e.currentTarget.validationMessage);

	let { name, id, label, ...rest }: HTMLInputAttributes & { label: string } = $props();
</script>

<div class="w-full mb-5">
	<label class="font-medium block mb-2" for={id ?? name}>{label}</label>
	<input
		class="input w-full"
		id={id ?? name}
		{name}
		oninput={updateErrorMsg}
		oninvalid={updateErrorMsg}
		{...rest}
	/>
	<p class="text-xs hidden mt-2">
		{errorMsg}
	</p>
</div>

<style>
	input:user-invalid {
		--input-color: var(--color-error);
	}

	input:user-invalid + p {
		display: block;
		color: var(--color-error);
	}
</style>
