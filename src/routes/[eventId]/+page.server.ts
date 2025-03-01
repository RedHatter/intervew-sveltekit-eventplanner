import { deleteEventById, fetchEventById } from '$lib/server/remote-events';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const eventId = parseInt(params.eventId);
	return {
		event: fetchEventById(eventId)
	};
};

export const actions: Actions = {
	default: async ({ params }) => {
		const eventId = parseInt(params.eventId);

		const res = await deleteEventById(eventId);

		if (!res) {
			error(404);
		}

		redirect(303, '/');
	}
};
