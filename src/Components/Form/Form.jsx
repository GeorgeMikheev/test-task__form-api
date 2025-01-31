import { useRef } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import { setDataAPI } from "../../Api/Api";

const Form = () => {
	const navigate = useNavigate();
	const usersData = localStorage.getItem("users_data")
		? JSON.parse(localStorage.getItem("users_data"))
		: [];
	console.log(usersData);
	const nameInput = useRef(null);
	const phoneInput = useRef(null);

	function checkUserData(nameToCheck, phoneToCheck) {
		if (!usersData.length) return true;
		return usersData.every(
			({ name, phone }) =>
				JSON.stringify({ name, phone }) !==
				JSON.stringify({
					name: nameToCheck,
					phone: phoneToCheck,
				})
		);
	}

	function saveUsersData(name, phone) {
		usersData.push({ name: name, phone: phone });
		localStorage.setItem("users_data", JSON.stringify(usersData));
	}

	function checkValidation(name, phone) {
		const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
		const phonePattern = /^[0-9\+\-\(\)\s]+$/;

		if (!name || !namePattern.test(name)) {
			alert("Пожалуйста, введите корректное имя (только буквы и пробелы).");
			return false;
		}

		if (!phone || !phonePattern.test(phone)) {
			alert(
				"Пожалуйста, введите корректный номер телефона (только цифры и символы +, -, (, ))."
			);
			return false;
		}

		return true;
	}

	function setData(evt) {
		evt.preventDefault();

		const name = nameInput.current.value;
		const phone = phoneInput.current.value;

		if (!checkValidation(name, phone)) return;
		if (!checkUserData(name, phone)) {
			alert('Ваш запрос уже отправлен');
			return;
		}
        
		if (name && phone)
		    setDataAPI(name, phone)
		        .then((res) => {
		            if (res.ok) {
		                saveUsersData(name, phone);
		                navigate("/success");
		            }
		        })
		        .catch((err) => console.log(`Error: ${err}`));
		else alert("Нужно заполнить поля");
	}

	return (
		<form onSubmit={setData} className="form">
			<input ref={phoneInput} placeholder="phone" type="tel" />
			<input ref={nameInput} placeholder="name" type="text" />
			<button>Enter</button>
		</form>
	);
};

export default Form;
