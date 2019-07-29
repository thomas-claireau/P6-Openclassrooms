document.addEventListener('DOMContentLoaded', () => {
	const btnPlay = document.querySelector('.play button');
	const btnCustom = document.querySelector('.custom button');
	const option = document.querySelector('.container-custom .option-game');
	const optionsGrid = option.querySelectorAll('.grid .select');

	let listOptions = new Array();

	optionsGrid.forEach((option) => {
		listOptions.push(option);
	});

	console.log(listOptions);

	btnPlay.addEventListener('click', function() {
		console.log('GOOOO !');
	});

	btnCustom.addEventListener('click', function() {
		const optionOne = listOptions[0];
		optionOne.classList.remove('hide');

		btnPlay.classList.add('hide');
		btnCustom.classList.add('hide');

		// init option
		const slider = listOptions[0].querySelector('input');
		const output = document.querySelector('label[for="nbCase"] .output');

		output.innerHTML = slider.value; // Display the default slider value

		// Update the current slider value (each time you drag the slider handle)
		slider.oninput = function() {
			output.textContent = slider.value;
		};
	});

	// next option
	const nextButtons: NodeListOf<HTMLElement> = document.querySelectorAll('.next');
	nextButtons.forEach((nextButton) => {
		const target = nextButton.dataset.id;
		console.log(target);
	});
});
