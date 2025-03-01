import { parseEventRequest } from '$lib/server/parseEventRequest';
import { createEvent } from '$lib/server/remote-events';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const eventData = await parseEventRequest(request);
		const newEvent = await createEvent(eventData);
		redirect(303, `/${newEvent.id}`);
	}
};
