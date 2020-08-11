window.onload = function () {
	fetchUsers()
}

let timeoutNumber;

function handleInputChange(event) {
	fetchUsers(event.target.value);
}

function fetchUsers(userSearchedValue) {
	const searchedValue = userSearchedValue ? userSearchedValue.trim() : '';
	
	if(timeoutNumber) {
		clearTimeout(timeoutNumber);
	}
	
	timeoutNumber = setTimeout(() => {
		fetch(`http://localhost:3000/users?first_name_like=${searchedValue}`)
		.then(response => response.json())
		.then(json => {
			updateResultSection(json);
		})
	}, 500)
}

function updateResultSection(users) {
	const resultContainer = document.querySelector('#resultContainer');
	let htmlStr = ''

	if(Array.isArray(users)) {
		users.forEach(user => {
			const userDetail = `<div class="user-detail">${user.first_name} ${user.last_name}</div>`;

			htmlStr = htmlStr + userDetail;
		});
	}

	resultContainer.innerHTML = htmlStr;
}