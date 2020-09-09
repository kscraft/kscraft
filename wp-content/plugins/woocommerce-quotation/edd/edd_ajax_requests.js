jQuery(document).ready(function($) {
	$('#check-status-button, #check-version-button').on('click', function(event) {
		event.preventDefault();	

		$('.info').block({
		    message: null,
		    overlayCSS: {
		        background: '#fff',
		        opacity: 0.6
		    }
		})	

		var edd_action = '';
		switch ($(event.target).attr('id')) {
			case 'check-status-button':
				edd_action = 'check_license';
				break;
			case 'check-version-button': 
				edd_action = 'get_version';
				break;
		};

		$.ajax({
            url         : api_params.ajaxurl+'?action=' + edd_action,
            dataType    : 'html'
        })
        .done(function(data, textStatus, jqXHR) {
        	$('.info').html(data);
        	$('.info').unblock();
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("error");
        });
		
	});
});