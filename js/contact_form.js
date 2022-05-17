var form = document.getElementById("contactForm");

async function handleSubmit(event) {
    event.preventDefault();
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            document.getElementById("submitContactFormSuccessMessage").classList.remove('d-none');
            form.reset()
        } else {
             document.getElementById("submitContactFormErrorMessage").classList.remove('d-none');
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    console.log(data["errors"].map(error => error["message"]).join(", "))
                } else {
                   console.log("There was error on contact form submission but no error message was retrieved.")
                }
            })
        }
    }).catch(error => {
        document.getElementById("submitContactFormErrorMessage").classList.remove('d-none');
        console.log(error)
        // status.innerHTML = "Oops! There was a problem submitting your form"
    });
}

form.addEventListener("submit", handleSubmit)