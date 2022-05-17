var contact_form = document.getElementById("contactForm");
async function handleSubmit(event) {
    event.preventDefault();
    var data = new FormData(event.target);
    var success_tag =  document.getElementById("submitContactFormSuccessMessage");
    var error_tag =  document.getElementById("submitContactFormErrorMessage");

    if (! error_tag.classList.contains('d-none')){
        error_tag.classList.add('d-none')
    }
    if (! success_tag.classList.contains('d-none')){
        success_tag.classList.add('d-none')
    }

    fetch(event.target.action, {
        method: contact_form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            success_tag.classList.remove('d-none');
            contact_form.reset()
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

contact_form.addEventListener("submit", handleSubmit)
