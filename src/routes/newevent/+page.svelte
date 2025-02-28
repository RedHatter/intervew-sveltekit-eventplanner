<script lang="ts">
	import { enhance } from '$app/forms';

	let disabled = $state(false);
</script>

<form
	method="POST"
	use:enhance={() => {
		disabled = true;

		return async ({ update }) => {
			await update();
			disabled = false;
		};
	}}
>
	<!-- form for creating new event -->
	<label for="title">Title</label>
	<input {disabled} type="text" id="title" name="title" required />
	<textarea
		{disabled}
		id="description"
		name="description"
		rows="4"
		cols="50"
		placeholder="Description"
	></textarea>
	<label for="date">Date</label>
	<input {disabled} type="datetime-local" id="date" name="date" required />
	<button {disabled} type="submit">
		Create Event
		{#if disabled}
			<span class="loading loading-spinner loading-xs"></span>
		{/if}
	</button>
</form>
