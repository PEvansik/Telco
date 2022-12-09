console.log('peep')
const formEl = document.getElementById('cusId')

let update =  document.querySelector('.update-btn')

// update.addEventListener('click', updateEntry)

// async function updateEntry() {
//     let url = '/details';
//     let payload = {
//         name: 'James',
//         number: 38947
//     }
//     let options = {
//         method: 'PUT',
//         Headers: {'content- Type': 'application/json'},
//         body: JSON.stringify(payload)
//     }


//     try {
//         let response = await fetch(url, options)
//         let data = await response.json()
//         console.log(data, response.status)
//     }catch(err) {
//         console.error(err)
//     }


// }




















formEl.addEventListener('submit', handleFormSubmit)

async function handleFormSubmit(event) {

    console.log('enterd')
	event.preventDefault();
	const form = event.currentTarget;

	const url = form.action;

	try {
		const formData = new FormData(form);
		const responseData = await postFormDataAsJson({ url, formData });
		console.log({ responseData });

	}catch (err) {
		console.error(err);
	}
}

async function postFormDataAsJson({ url, formData }) {
	const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);

	const fetchOptions = {

		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: formDataJsonString,
	};

	const response = await fetch(url, fetchOptions);

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

	return response.json();

}