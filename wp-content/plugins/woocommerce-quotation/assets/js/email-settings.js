(function( $ ) {

	$(function () {
        var currentRequest,
            oldId = null;

        oldId = (data.section != '' && $('#mainform .form-table input[id$="_id"]').val());

        $('#mainform').submit(function (e) { 
            var target  = e.currentTarget,
                newId   = $(target).find('.form-table input[id$="_id"]').val();

            $(target).find('.form-table input:not([id$="_id"])').removeClass('has_error');
            $(target).find('.form-table input[id$="_title"]').val() == "" && $(target).find('.form-table input[id$="_title"]').addClass('has_error');
            $(target).find('.form-table input[id$="_description"]').val() == "" && $(target).find('.form-table input[id$="_description"]').addClass('has_error');

            var _input_has_error = $(target).find('.form-table input.has_error');
            if (_input_has_error.length > 0) {
                _input_has_error[0].focus();
                return false;
            }
                        
            changeNameAttr(target);

            if (oldId && oldId != newId) {
                $(target).find('.form-table').append('<input type="hidden" name="redirect_to" value="' + newId + '" />');
            }
        });

        $('#mainform .form-table input[id$="_id"]').on('change keyup', function (e) { 
            var $_this = $(this);

            $_this.siblings('.fa').removeClass('red green fa-close fa-check').addClass('fa-spinner fa-spin');
            $_this.siblings('.error').text('');

            currentRequest && currentRequest.abort();            
            currentRequest = $.ajax({
                type: "get",
                url: adminAjax,
                data: {action: 'verify_id', email_id: $_this.val(), current_section: data.section},
                dataType: "json",
                success: function (response) {
                    if (response.has_email) {
                        $_this.siblings('.fa').removeClass('fa-spinner fa-spin').addClass('fa-close red');
                        $_this.siblings('.error').text(textIdInUse);
                        $_this.addClass('has_error');
                    } else {
                        $_this.siblings('.fa').removeClass('fa-spinner fa-spin').addClass('fa-check green');
                        $_this.removeClass('has_error');
                    }
                    if (response.error) {
                        $_this.siblings('.fa').removeClass('fa-spinner fa-spin').addClass('fa-close red');
                        $_this.siblings('.error').text(response.error);
                    }
                    console.log(response);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR, textStatus);
                }
            });
        }).after("<i class='fa'></i><span class='error'></span>");
    });

    changeNameAttr = function (form) {  
        
        var $_form  = $(form),
            id      = $_form.find('#woocommerce_' + data.section + '_id').val();        

        $_form.find('#woocommerce_' + data.section + '_id').attr('name', data.pluginId + id + '_id');
        $_form.find('#woocommerce_' + data.section + '_enabled').attr('name', data.pluginId + id + '_enabled');
        $_form.find('#woocommerce_' + data.section + '_title').attr('name', data.pluginId + id + '_title');
        $_form.find('#woocommerce_' + data.section + '_description').attr('name', data.pluginId + id + '_description');
        $_form.find('#woocommerce_' + data.section + '_subject').attr('name', data.pluginId + id + '_subject');
        $_form.find('#woocommerce_' + data.section + '_heading').attr('name', data.pluginId + id + '_heading');
        $_form.find('#woocommerce_' + data.section + '_content').attr('name', data.pluginId + id + '_content');
        $_form.find('#woocommerce_' + data.section + '_email_type').attr('name', data.pluginId + id + '_email_type');
        $_form.find('#woocommerce_' + data.section + '_send_to').attr('name', data.pluginId + id + '_send_to');
        $_form.find('#woocommerce_' + data.section + '_order_status').attr('name', data.pluginId + id + '_order_status');
        $_form.find('#woocommerce_' + data.section + '_order_action').attr('name', data.pluginId + id + '_order_action');

        $_form.find('.form-table').append('<input type="hidden" name="email_id" value="' + id + '" />');
    }

})( jQuery );