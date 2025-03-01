<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="bg-base-200 min-h-screen flex items-center justify-center">
	<div class="bg-base-100 text-base-content rounded-box p-5 w-2xl mt-5 mb-5">
		{@render children()}
	</div>
</div>
