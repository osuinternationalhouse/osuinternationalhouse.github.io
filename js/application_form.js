var application_form = document.getElementById("applyForm");
async function handleSubmit(event) {
    event.preventDefault();
    var data = new FormData(event.target);
    var success_tag =  document.getElementById("submitApplicationFormSuccessMessage");
    var error_tag =  document.getElementById("submitApplicationFormErrorMessage");

    if (! error_tag.classList.contains('d-none')){
        error_tag.classList.add('d-none')
    }
    if (! success_tag.classList.contains('d-none')){
        success_tag.classList.add('d-none')
    }

    fetch(event.target.action, {
        method: application_form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            success_tag.classList.remove('d-none');
            application_form.reset()
        } else {
            error_tag.classList.remove('d-none')
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    console.log(data["errors"].map(error => error["message"]).join(", "))
                } else {
                   console.log("There was error on contact form submission but no error message was retrieved.")
                }
            })
        }
    }).catch(error => {
        error_tag.classList.remove('d-none')
        console.log(error)
    });
}

application_form.addEventListener("submit", handleSubmit)
