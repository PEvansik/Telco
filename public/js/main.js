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

    let response = await fetch(url, options)

    return response.json
}

