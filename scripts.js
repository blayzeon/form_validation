/*
    Email, Country, Zip Code, Password and Password Confirmation fields
    live inline validation to inform the user whether a field is properly filled in or not
    give an error message if the button is pushed with any active errors or unfilled required fields
*/

const createForm = function generateFormAndValidation (inputs){
    const formSettings = {
        password: {
            type: 'password',
            label: 'Password: ',
            pattern: `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`,
            invalid: 'Please provide a stronger password.',
            required: true
        },
        password2: {
            type: 'password',
            label: 'Repeat Password: ',
            pattern: false,
            invalid: 'Passwords do not match.',
            required: true
        },
        email: {
            type: 'email',
            label: 'Email: ',
            pattern: false,
            invalid: 'Please provide a valid email address.',
            required: true
        },
        zipcode: {
            type: 'text',
            label: 'Zip Code: ',
            pattern: '[0-9A-Za-z][0-9][0-9A-Za-z][0-9][0-9A-Za-z][0-9]{0,}',
            invalid: 'Please provide a valid zip code or postal code',
            required: false
        },
        county: {
            type: 'select',
            label: 'County: ',
            options: ['', 'USA', 'Canada', 'Mexico'],
            invalid: 'Please select a valid country',
            required: false
        }
    }

    const newForm = document.createElement('form');
    newForm.setAttribute('action', '')

    for (let i = 0; i < inputs.length; i++){
        let match = false;
        for (key in formSettings){
            if (key === inputs[i]){
                match = key;
            }
        }

        const formGroup = document.createElement('div');
        const newLabel = document.createElement('label');
        newLabel.innerText = formSettings[match].label;
        let newField = document.createElement('input');

        if (formSettings[match].type === 'select'){
            newField = document.createElement('select');
            for (let j = 0; j < formSettings[match].options.length; j++){
                const newOption = document.createElement('option');
                newOption.setAttribute('value', formSettings[match].options[j]);
                newOption.innerText = formSettings[match].options[j];
                newField.appendChild(newOption);
            }
        } else {
            newField.setAttribute('type', formSettings[match].type);
            if (formSettings[match].pattern !== false){
                newField.setAttribute('pattern', formSettings[match].pattern);
            }
        }
        
        newLabel.appendChild(newField);
        formGroup.appendChild(newLabel)
        newForm.appendChild(formGroup);
        if (inputs[i] === 'password2'){
            newField.addEventListener('input', function (event) {
                const password = document.querySelector("input[type='password']");
                if (newField.value === password.value){
                    newField.setCustomValidity('');
                    if (newField.classList.contains('invalid')){
                        newField.classList.remove('invalid');
                    }
                } else {
                    newField.setCustomValidity(formSettings[match].invalid);
                    newField.reportValidity();
                }
            });
        } else {
            newField.addEventListener('focusout', function (event) {
                if (newField.validity.typeMismatch || newField.validity.patternMismatch){
                    newField.setCustomValidity(formSettings[match].invalid);
                    newField.reportValidity();
                } else {
                    newField.setCustomValidity('');
                    if (newField.classList.contains('invalid')){
                        newField.classList.remove('invalid');
                    }
                }
            });
        }

        if (formSettings[match].required === true){
            newField.setAttribute('required', 'true');
            const required = document.createElement('span');
            required.innerText = '*';
            formGroup.appendChild(required);
        }
    }

    const submitBtn = document.createElement('button');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.innerText = 'Submit';
    submitBtn.addEventListener('click', ()=>{
        let valid = true;
        const inputs = document.querySelectorAll('input');
        inputs.forEach((input) => {
            if (!input.checkValidity()){
                valid = false;
                input.classList.add('invalid');
            } else {
                if (input.classList.contains('invalid')){
                    input.classList.remove('invalid');
                }
            }
        });

        if (valid === true){
            alert('Valid!');
        }
    })
    newForm.appendChild(submitBtn);
    document.body.appendChild(newForm);
}

createForm(['email', 'county', 'zipcode', 'password', 'password2']);
