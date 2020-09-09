jQuery(document).ready(function($){
    $('.attachment_delete').click(function() {
        $('.input_text').each( function() { $(this).val('') });
        return false;
    });
    
    var toggleShippingQuotelist = function() {

        if ($('#adq_inherit_shipping_conf').is(':checked')) {
                $('.adq_inherit_shipping').slideUp( 200 );
        }
        else {
                $('.adq_inherit_shipping').slideDown( 200 );                
        }
    };
    
    $( '#adq_inherit_shipping_conf' ).on( 'change', toggleShippingQuotelist );
    
    if (typeof($( '#adq_inherit_shipping_conf' )) != 'undefined' && $( '#adq_inherit_shipping_conf' ) != null) {
            toggleShippingQuotelist();
    }
    
    
    var toggleTermsVisibility = function() {
        
        $('.adq_terms_visibility').each(function() {
                $(this).remove();
        });   
        
        var taxonomy = $('#adq_taxonomy_filter').val();
        if ( taxonomy == "" )
            return;                 
        
        $.post(
            ajaxurl, 
            {
                'action': 'adq_taxonomy_load',
                'taxonomy': taxonomy,
            }, 
            function(response){                
                $( ".form-table tbody" ).append(response);
                
                $( document.body ).trigger( 'wc-enhanced-select-init' );
                
                $('.adq_'+taxonomy+'_terms').slideDown( 200 );
                
                return;
            },
            'html'
        );
    };
    
    if ( typeof $('#adq_taxonomy_filter').val() != 'undefined' ) {
        
            $("#adq_taxonomy_filter").on( 'change', toggleTermsVisibility );
            toggleTermsVisibility();
    }

    
    var toggleProductAdqOptions = function( el ) {                       
        if (el.is(':checked')) {
                el.next( "div" ).slideUp( 200 );
        }
        else {
                el.next( "div" ).slideDown( 200 );                
        }
    };            
    
    $( '#_adq_inherit_visibility_quote' ).change(function() { toggleProductAdqOptions ($(this)) });
    $( '#_adq_inherit_visibility_price' ).change(function() { toggleProductAdqOptions ($(this)) });
    $( '#_adq_inherit_visibility_cart' ).change(function() { toggleProductAdqOptions ($(this)) });
    $( '#_adq_inherit_allow_product_comments' ).change(function() { toggleProductAdqOptions ($(this)) });    
    $( '#adq_product_force_button_check').change(function(event) {
        if ( $(event.target).is(':checked') ) {
            $('#adq_product_force_button').removeAttr('disabled')
        } else {
            $('#adq_product_force_button').attr('disabled', 'true');
        }
    })

    $('[id$=_send_to]').change(function() {
        if ($(this).val() == 'admin' || $(this).val() == 'only_recipients') {
            $('[id$=_recipient]').parents('tr').slideDown(200)
        } else {
            $('[id$=_recipient]').parents('tr').slideUp(200)
        }
    })
    $('[id$=_send_to]').trigger('change');
    
    if (typeof($( '.adq_option_products' )) != 'undefined' && $( '.adq_option_products' ) != null) {
            $(".adq_option_products").find("input[type='checkbox']").each (function () {
                    toggleProductAdqOptions($(this));
            });            
    }

    $( '[data-force-styles-checkbox]' ).change(function (e) { 
        var $_target = $(e.currentTarget);

        if ($_target.is(':checked')) {
            $_target.parent().siblings( "div" ).slideUp( 200 );
        } else {
                $_target.parent().siblings( "div" ).slideDown( 200 );                
        }
    })
    $( '[data-force-styles-checkbox]' ).trigger('change');
    
    // File inputs
    $('#woocommerce-quotation-addons').on('click','.downloadable_files a.insert',function(){
            $(this).closest('.downloadable_files').find('tbody').append( $(this).data( 'row' ) );
            return false;
    });
    $('#woocommerce-quotation-addons').on('click','.downloadable_files a.delete',function(){
            $(this).closest('tr').remove();
            return false;
    });
    
    
    var toggleCustomPaymentUrl = function() {
        if ($('input[name="adq_redirect_payment"]:checked').val() == 'custom') {
                $('#adq_url_redirect_payment').closest( "tr" ).slideDown( 200 );  
        }
        else {
                $('#adq_url_redirect_payment').closest( "tr" ).slideUp( 200 );                              
        }
    };
    
    $('input[name="adq_redirect_payment"]').on( 'change', toggleCustomPaymentUrl );
    
    if (typeof($('input[name="adq_redirect_payment"]')) != 'undefined' && $('input[name="adq_redirect_payment"]') != null) {
            toggleCustomPaymentUrl();
    }

    $('[data-confirm]').on('click touch', function (event) {
        $_target = $(event.currentTarget);

        if (!confirm($_target.data('confirmMessage'))) {
            event.preventDefault()
        }
    });

    $('#adq_billing_country_visible').change(function (e) {
        $_target = $(e.currentTarget);

        if ( $_target.is(':checked') ) {
            $('#adq_billing_state_visible').prop('disabled', false);
            $('#adq_billing_state_required').prop('disabled', false);
        } else {
            $('#adq_billing_state_visible').prop('checked', false);
            $('#adq_billing_state_required').prop('checked', false);
            $('#adq_billing_state_visible').prop('disabled', true);
            $('#adq_billing_state_required').prop('disabled', true);
        }
    }).trigger('change');

    $('#adq_billing_first_name_visible, #adq_billing_last_name_visible, #adq_billing_company_visible, #adq_billing_country_visible, #adq_billing_address_1_visible, #adq_billing_address_2_visible, #adq_billing_city_visible, #adq_billing_state_visible, #adq_billing_postcode_visible, #adq_billing_phone_visible').change(function (e) {
        $_target = $(e.currentTarget);
        field = $_target.prop('id').replace('_visible', '');

        if ( $_target.is(':checked') ) {
            $('#' + field + '_required').prop('disabled', false);
        } else {
            $('#' + field + '_required').prop('checked', false);
            $('#' + field + '_required').prop('disabled', true);
        }
    }).trigger('change');

});