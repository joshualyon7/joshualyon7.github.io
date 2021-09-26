const submitButton = document.getElementById('submit');
const domainList = [];
const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*/;
const phoneValidator = new RegExp('[0-9]{3}-[0-9]{3}-[0-9]{4}')

async function getTldList() {
    const utf8Decoder = new TextDecoder('utf-8');
    const url = "http://data.iana.org/TLD/tlds-alpha-by-domain.txt";
    const response = await fetch(url, {method: 'GET'})
    return await response.text();
}

async function setUpDomainList() {
    const domains = await getTldList();
}

function assertNonNull(inputField, err_field) {
    const err_html = document.getElementById(err_field);

    if (!inputField.html.value.length > 0) {
        if (err_html.innerHTML.length === 0){
            err_html.innerHTML = `\n<strong>${inputField.html.id}</strong> must not be empty`; 
        }
        inputField.valid = false;
    }
    else {
        err_html.innerHTML = '';
        inputField.valid = true;
    }

    checkSubmitButton();
    return inputField.valid;
}

function validateEmail(inputField, err_field) {
    if (!assertNonNull(inputField, err_field)) return;
    const err_html = document.getElementById(err_field);

    const splitEmail = inputField.html.value.split('.')
    const domain = splitEmail[splitEmail.length - 1];
    
    if (!((emailValidator).test(inputField.html.value)) || !(domainList.includes(domain.toUpperCase()))) {
        err_html.innerHTML = `\n<strong>${inputField.html.value}</strong> is not a valid email`; 
        inputField.valid = false;
        console.log("invalid email");
    }
    else {
        console.log("valid email");
        inputField.valid = true;
    }
    

}

function validatePhone(inputField, err_field) {
    if (!assertNonNull(inputField, err_field)) return;
    const err_html = document.getElementById(err_field);

    if(!inputField.html.value.match(phoneValidator)) {
        err_html.innerHTML = `\n<strong>${inputField.html.id}</strong> must only contain numbers and be in the form of 123-456-7890`;
        inputField.valid = false;
    } else {
        err_html.innerHTML = '';
    }

    checkSubmitButton();

}

function checkSubmitButton() {
    if (Object.values(formEntries).every(entry => {
        if(entry.valid) {
            console.log("good " + entry.html.id);
        } else {
            console.log("bad " + entry.html.id);
        }
        return entry.valid;
    })) {
        submitButton.disabled = false;
    } 
    else {
        submitButton.disabled = true;
    }
}

const formEntries = {
    fname: {
        html: document.getElementById('First name'),
        valid: false,
    },
    lname: {
        html: document.getElementById('Last name'),
        valid: false,
    },
    email: {
        html: document.getElementById('Email'),
        valid: false
    },
    phone: {
        html: document.getElementById('Phone number'),
        valid: false
    },
    message: {
        html: document.getElementById('Message'),
        valid: false,
    }
};

formEntries.fname.html.addEventListener("blur", () => {
    assertNonNull(formEntries.fname, 'first_v');
});

formEntries.lname.html.addEventListener("blur", () => {
    assertNonNull(formEntries.lname, 'last_v')
});

formEntries.email.html.addEventListener("blur", () => {
    validateEmail(formEntries.email, 'email_v')
});

formEntries.phone.html.addEventListener("blur", () => {
    validatePhone(formEntries.phone, 'phone_v')
});

formEntries.message.html.addEventListener("blur", () => {
    assertNonNull(formEntries.message, 'msg_v')
});

getTldList().then( (domains) => {
    domains.split('\n').slice(1).forEach(domain => domainList.push(domain));
    const lastElement = domainList.pop();
    if (lastElement !== '') domainList.push(lastElement);
});