const TOKEN = import.meta.env.VITE_TOKEN;
const URL = import.meta.env.VITE_URL;

export const setDataAPI = (userName, userPhone) =>
	fetch(`${URL}/v1/order`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${TOKEN}`,
		},
		body: JSON.stringify({
			stream_code: "vv4uf",
			client: {
				phone: userPhone,
				name: userName,
			},
		}),
	});
