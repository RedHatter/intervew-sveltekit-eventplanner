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
		const formdata = await request.formData();
		const title = formdata.get('title')?.toString();
		const description = formdata.get('description')?.toString();
		const date = formdata.get('date')?.toString();

		const eventId = parseInt(params.eventId)

		if (!title || !date) {
			error(400, 'Title and Date are required');
		}

		const newEvent = await updateEventById(eventId, { title, description, date });

		if (newEvent === null) {
			error(404);
		}

		redirect(303, `/${newEvent.id}`);
	}
};
