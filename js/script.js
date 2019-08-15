document.addEventListener('DOMContentLoaded', () => {
	const btnPlay = document.querySelector('.play button');
	const btnCustom = document.querySelector('.custom button');
	const btnPlayCustom = document.querySelector('.play-custom');
	const containerStart = document.querySelector('.choice');
	const containerOption = document.querySelector('.container-custom');
	const optionsGrid = containerOption.querySelectorAll('.select');

	btnPlay.addEventListener('click', function() {
		new Default().init();
	});

	btnCustom.addEventListener('click', function() {
		containerStart.classList.add('hide');
		containerOption.classList.remove('hide');

		btnPlayCustom.addEventListener('click', function() {
			new Custom().init();
		});

		optionsGrid.forEach((option) => {
			const inputOption = option.querySelector('input');
			const outputOption = option.querySelector('.output');
			outputOption.innerHTML = inputOption.value;
			inputOption.oninput = function() {
				outputOption.textContent = inputOption.value;
			};
		});
	});
});
