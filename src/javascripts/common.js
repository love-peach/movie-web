$(document).ready(function () {
	var $logOut = $('#logOut');
	$logOut.on('click', function() {
		$.ajax({
			type: 'post',
			url: '/user/logout',
			headers: {
				'Accept': "application/xxx",
				'Content-Type': "application/json; charset=utf-8",
			},
			dataType: 'json',
			success: function(res) {
				console.log(res);
				if(res.success === 1) {
					location.href = '/';
				}
	    	}
		});
	});
});