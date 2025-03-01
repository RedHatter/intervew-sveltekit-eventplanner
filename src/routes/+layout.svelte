<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="bg-base-200 min-h-screen flex items-center justify-center">
	<div class="bg-base-100 text-base-content relative rounded-box p-5 my-5 w-2xl">
		<!-- TODO: Save to local storage -->
		<label class="absolute right-6 text-sm flex gap-2">
			Dark mode
			<input type="checkbox" value="dark" class="toggle toggle-sm theme-controller" />
		</label>
		{@render children()}
	</div>
</div>
