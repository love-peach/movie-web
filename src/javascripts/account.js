$(document).ready(function() {
	var $submitLogin = $('.submit-login');
	var $submitSingin = $('.submit-singin');
	var $inputAccount = $('#inputAccount');
	var $inputPasswrod = $('#inputPasswrod');
	var $inputPasswrodConfirm = $('#inputPasswrodConfirm');
	var $inputVerificationCode = $('#inputVerificationCode');

	$submitLogin.on('click', function() {
		var sendData = getSendData('login');
		$.ajax({
			type: 'post',
			url: '/users/login',
			headers: {
			 	'Accept': "application/xxx",
			 	'Content-Type': "application/json; charset=utf-8",//(可以)
		    },
			data: JSON.stringify(sendData),
			dataType: 'json',
			success: function(res) {
				if(res.success === 1) {
					location.href = '/';
				} else {
					alert(res.message);
				}
			}
		});
	});

	$submitSingin.on('click', function() {
		var sendData = getSendData('singin');
		$.ajax({
			type: 'post',
			url: '/users/singin',
			headers: {
			 	'Accept': "application/xxx",
			 	'Content-Type': "application/json; charset=utf-8",//(可以)
		    },
			data: JSON.stringify(sendData),
			dataType: 'json',
			success: function(res) {
				if(res.success === 1) {
					location.href = '/login';
				} else {
					alert(res.message);
				}
			}
		});
	});

	function getSendData(type) {
		var sendData = {
			account: $inputAccount.val(),
			password: $inputPasswrod.val(),
		};
		if(type === 'login') {
			sendData.verificationCode = $inputVerificationCode.val();
		} else {
			sendData.passwrodConfirm = $inputPasswrodConfirm.val();
		}
		return sendData;
	}
});