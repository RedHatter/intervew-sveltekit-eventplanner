import { parseEventRequest } from '$lib/server/parseEventRequest';
import { fetchEventById, updateEventById } from '$lib/server/remote-events';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const eventId = parseInt(params.eventId);
	return {
		event: fetchEventById(eventId)
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const eventId = parseInt(params.eventId);

		const eventData = await parseEventRequest(request);
		const updatedEvent = await updateEventById(eventId, eventData);

		if (updatedEvent === null) {
			error(404, `Event "${eventId}" not found`);
		}

		redirect(303, `/${updatedEvent.id}`);
	}
};
