$(document).ready(function() {
	$('.del').on('click', function() {
		var _id = $(this)[0].dataset.id;
		var $tr = $('.movie-id-' + _id);
		// return;
		$.ajax({
			type: 'delete',
			url: '/movie/delete/' + _id,
			headers: {
				'Accept': "application/xxx",
				'Content-Type': "application/json; charset=utf-8",
			},
			dataType: 'json',
			success: function(res) {
				console.log(res);
				if(res.success === 1) {
					console.log($tr, '$tr');
					$tr.remove();
				}
	    	}
		});
	});
})