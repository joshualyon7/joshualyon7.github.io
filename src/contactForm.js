const submitButton = document.getElementById('submit');
const domainList = [];

// Adapted regex from https://www.w3resource.com/javascript/form/email-validation.php
const emailValidator = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*/;

// Custom regex
const phoneValidator = new RegExp('[0-9]{3}-[0-9]{3}-[0-9]{4}')

async function getTldList() {
    const utf8Decoder = new TextDecoder('utf-8');
    const url = "https://data.iana.org/TLD/tlds-alpha-by-domain.txt";
    const response = await fetch(url, {method: 'GET'}).catch(async err => {
        return await fetch('../assets/staticDomains.txt');
    })
    return await response.text();
}

async function setUpDomainList() {
    const domains = await getTldList();
}

function assertNonNull(inputField, err_field) {
    const err_html = document.getElementById(err_field);

    if (!inputField.html.value.length > 0) {
        if (err_html.innerHTML.length === 0){
            err_html.innerHTML = `\n<strong>${inputField.html.id.replace('_', ' ')}</strong> must not be empty`; 
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
    }
    else inputField.valid = true;

    checkSubmitButton();
}

function validatePhone(inputField, err_field) {
    if (!assertNonNull(inputField, err_field)) return;
    const err_html = document.getElementById(err_field);

    if(!inputField.html.value.match(phoneValidator)) {
        err_html.innerHTML = `\n<strong>${inputField.html.id.replace('_', ' ')}</strong> must only contain numbers and be in the form of 123-456-7890`;
        inputField.valid = false;
    } else {
        err_html.innerHTML = '';
    }

    checkSubmitButton();
}

function checkSubmitButton() {
    submitButton.disabled = !Object.values(formEntries).every(entry => entry.valid)
}

const formEntries = {
    fname: {
        html: document.getElementById('First_Name'),
        valid: false,
    },
    lname: {
        html: document.getElementById('Last_Name'),
        valid: false,
    },
    email: {
        html: document.getElementById('Email'),
        valid: false
    },
    phone: {
        html: document.getElementById('Phone_Number'),
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
