const validations = {
	title: (title) => validator.isLength(title, { min: 3, max: 100 }),
	price: (price) => validator.isInt(price, { min: 1 }),
	brand: (brand) => validator.isInt(brand),
	category: (category) => validator.isInt(category),
	description: (title) => validator.isLength(title, { max: 1000 }),
	file: (file) => (file ? true : false),
}

const ERROR_MESSAGES = {
	title: 'Minimo 3 caracteres maximo 100 !',
	price: 'El precio tiene que ser mayor que 0',
	brand: 'Formato de marca incorrecto',
	category: 'Formato de categoria incorrecto',
	description: 'Maximo 1000 caracteres !!',
	file: 'Subi una foto de tu producto',
}

const printErrorInput = (input) => {
	input.parentNode.insertAdjacentHTML(
		'beforeend',
		`<p class="validationMessage" style="font-size: 12px">
        <i class="validationMessage--i fas fa-exclamation-triangle" style="color: tomato"></i
        >${ERROR_MESSAGES[input.name]}
    </p>`
	)
}

const getValidation = (inputs) => {
	inputs.forEach((input) => {
		const hasError = input.parentNode.querySelector('.validationMessage')
		if (hasError) {
			input.parentNode.removeChild(hasError)
		}

		if (!validations[input.name](input.value)) {
			printErrorInput(input)
		}
	})
}

/*---------------------- DOM REFERENCES ---------------------*/
const inputs = document.querySelectorAll('.form-input')

const form = document.getElementById('createForm')

// inputsName.forEach(input=>console.log(input.name))

form.addEventListener('submit', (e) => {
	e.preventDefault()

	getValidation(inputs)
})
