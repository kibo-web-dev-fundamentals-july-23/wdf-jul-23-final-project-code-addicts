/**
 *      target the value from day, month and year
 *      check if the input is empty and display error if they are
 *      else run the calculation and return the result
 *
 *      new Date(year, month, date, hours, minutes, seconds, ms)
 *
 *      let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );
 *      alert(date);
 *
 *      getFullYear()
 *      Get the year (4 digits)
 *      getMonth()
 *      Get the month, from 0 to 11.
 *      getDate()
 *      Get the day of month, from 1 to 31, the name of the method does look a little bit strange.
 */

const calculateBtn = document.querySelector('button'),
	inputContainer = document.querySelector('.input-container')

calculateBtn.addEventListener('click', () => {
	const dayInput = document.querySelector('#day').value,
		monthInput = document.querySelector('#month').value,
		yearInput = document.querySelector('#year').value,
		dayOutput = document.querySelector('.result-container .day-value'),
		monthOutput = document.querySelector('.result-container .month-value'),
		yearOutput = document.querySelector('.result-container .year-value')

	if (dayInput === '' || monthInput === '' || yearInput === '') {
		labels = document.getElementsByTagName('label')
		inputContainer.classList.add('error')

		Array.from(labels).forEach((label) => {
			const errorMsg = createText('This field is required')
			label.appendChild(errorMsg)

			// remove the error after 3seconds
			setTimeout(() => {
				inputContainer.classList.remove('error')
				label.removeChild(errorMsg)
			}, 3000)
		})
	}

	if (monthInput > 12) {
		labels = document.getElementsByTagName('label')

		inputContainer.classList.add('error')
		const errorMsg = createText('Must be a valid month')

		labels[1].appendChild(errorMsg)

		setTimeout(() => {
			inputContainer.classList.remove('error')
			labels[1].removeChild(errorMsg)
		}, 3000)
	}

	const currentDate = new Date(),
		currentYear = currentDate.getFullYear(),
		currentMonth = currentDate.getMonth() + 1,
		currentDay = currentDate.getDate()

	if (yearInput > currentYear) {
		labels = document.getElementsByTagName('label')

		inputContainer.classList.add('error')

		const errorMsg = createText('Must be in the past')

		labels[2].appendChild(errorMsg)
		setTimeout(() => {
			inputContainer.classList.remove('error')
			labels[2].removeChild(errorMsg)
		}, 3000)
	}

	let ageDay = currentDay - dayInput,
		ageMonth = currentMonth - monthInput,
		ageYear = currentYear - yearInput

	const lastDayOfMonth = new Date(currentYear, currentMonth - 1, 0).getDate()

	if (dayInput > 31 || dayInput > lastDayOfMonth) {
		labels = document.getElementsByTagName('label')

		inputContainer.classList.add('error')

		const errorMsg = createText('Must be a valid day')

		labels[0].appendChild(errorMsg)

		setTimeout(() => {
			inputContainer.classList.remove('error')
			labels[0].removeChild(errorMsg)
		}, 3000)
	}

	if (ageDay < 0) {
		ageMonth--
		ageDay += lastDayOfMonth
	}

	if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
		ageYear--
		ageMonth += 12
	}

	if (
		(dayInput !== '' && dayInput < 31) &&
		(monthInput !== '' && monthInput <= 12) &&
		(yearInput !== '' && yearInput < currentDate)
	) {
		dayOutput.innerHTML = ageDay
		monthOutput.innerHTML = ageMonth
		yearOutput.innerHTML = ageYear
	} 
})

// function to create a the error message in a paragraph
function createText(text) {
	const errorMsg = document.createElement('p')
	errorMsg.classList.add('error')
	errorMsg.textContent = `${text}`

	return errorMsg
}