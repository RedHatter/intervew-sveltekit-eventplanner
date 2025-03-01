import { error } from '@sveltejs/kit';
import type { Event } from './remote-events';

export async function parseEventRequest(request: Request): Promise<Omit<Event, 'id'>> {
	const formdata = await request.formData();
	const title = formdata.get('title')?.toString();
	const description = formdata.get('description')?.toString();
	const date = formdata.get('date')?.toString();

	if (!title || !date) {
		error(400, 'Title and Date are required');
	}

	if (new Date(date).getTime() < Date.now()) {
		error(400, 'Date cannot be in the past');
	}

	return { title, description, date };
}
