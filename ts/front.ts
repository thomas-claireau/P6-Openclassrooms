document.addEventListener('DOMContentLoaded', () => {
	const btnPlay = document.querySelector('.play button');
	const btnCustom = document.querySelector('.custom button');
	const option = document.querySelector('.container-custom .option-game');
	const optionsGrid = option.querySelectorAll('.select');

	// btnPlay.addEventListener('click', function() {
	// 	// console.log('GOOOO !');
	// });

	// btnCustom.addEventListener('click', function() {
	// 	listOptions.forEach((option) => {
	// 		option.classList.remove('hide');
	// 	});

	// 	btnPlay.classList.add('remove');
	// 	btnCustom.classList.add('remove');
	// });

	optionsGrid.forEach((option) => {
		const inputOption = option.querySelector('input');
		const outputOption = option.querySelector('.output');

		outputOption.innerHTML = inputOption.value;

		inputOption.oninput = function() {
			outputOption.textContent = inputOption.value;
		};
	});
});
