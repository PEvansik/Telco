const { response } = require("express")

console.log('peep')
const formEl = document.getElementById('cusId')

let update = document.getElementById('update')

update.addEventListener('submit', handleupdate)

async function handleupdate(ev) {

    ev.preventDefault()
// get the form to submit
    let form = ev.currentTarget
//  house the form in an object
    let formData = new FormData(form) 
// get the forms URL
    let url = form.action
// create a JS object form the form (there are other methods)
    let formBody = Object.fromEntries(formData.entries())

    let options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formBody)
    }

    let repsonse = await fetch(url, options)
    if(!response.ok) throw new Error
    return response.json
}





































// formEl.addEventListener('submit', handleFormSubmit)

// async function handleFormSubmit(event) {

//     console.log('enterd')
// 	event.preventDefault();
// 	const form = event.currentTarget;

// 	const url = form.action;

// 	try {
// 		const formData = new FormData(form);
// 		const responseData = await postFormDataAsJson({ url, formData });
// 		console.log({ responseData });

// 	}catch (err) {
// 		console.error(err);
// 	}
// }

// async function postFormDataAsJson({ url, formData }) {
// 	const plainFormData = Object.fromEntries(formData.entries());
// 	const formDataJsonString = JSON.stringify(plainFormData);

// 	const fetchOptions = {

// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			"Accept": "application/json"
// 		},
// 		body: formDataJsonString,
// 	};

// 	const response = await fetch(url, fetchOptions);

// 	if (!response.ok) {
// 		const errorMessage = await response.text();
// 		throw new Error(errorMessage);
// 	}

// 	return response.json();

// }