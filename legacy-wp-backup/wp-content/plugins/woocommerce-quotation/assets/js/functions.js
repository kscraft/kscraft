(function ($) {
    $.each(['show', 'hide'], function (i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function () {
            this.trigger(ev);
            return el.apply(this, arguments);
        };
    });
})(jQuery);

//Duplicate jQuery from add-to-cart-variation
;(function ( $, window, document, undefined ) {

	$.fn.adq_variation_form = function() {
		var $form = this;

		// Bind new events to form
		$form

		// When the variation is hidden
		.on( 'hide_variation', function( event ) {
			event.preventDefault();
			$form.find( '.single_adq_button' ).removeClass( 'wc-variation-is-unavailable' ).addClass( 'disabled wc-variation-selection-needed' );
		} )

		// When the variation is revealed
		.on( 'show_variation', function( event, variation, purchasable ) {
			event.preventDefault();
			if ( !variation.is_in_stock && $form.find( '.single_adq_button' ).data( 'enableButton' ) == 'no' ) {
				$form.find( '.single_adq_button' ).removeClass( 'wc-variation-selection-needed' ).addClass( 'disabled wc-variation-is-unavailable' );
			} else {
				$form.find( '.single_adq_button' ).removeClass( 'disabled wc-variation-selection-needed wc-variation-is-unavailable' );
			}
		} );
        };
        
        $( function() {
		if ( typeof wc_add_to_cart_variation_params !== 'undefined' ) {
			$( '.variations_form' ).each( function() {
				$( this ).adq_variation_form();
			});
		}
	});
})( jQuery, window, document );

jQuery( function( $ ) {
    
        /* Quote Hiding */
	if ( $.cookie( 'adq_items_in_quote' ) > 0 ) {
		$( '.hide_cart_widget_if_empty' ).closest( '.adq_shopping_cart' ).show();
	} else {
		$( '.hide_cart_widget_if_empty' ).closest( '.adq_shopping_cart' ).hide();
	}
});
    

jQuery(document).ready(function($){
    /* AJAX functions */
        
    addToQuoteHandler = function(event) {
        var $thisbutton = $(event.target);
        var $container = $( "." + $(event.target).data('button') );

        if ($thisbutton.hasClass('disabled')) {
			if ( $( this ).is('.wc-variation-is-unavailable') ) {
				window.alert( adq_add_to_quote_variation_params.i18n_unavailable_text );
			} else if ( $( this ).is('.wc-variation-selection-needed') ) {
				window.alert( adq_add_to_quote_variation_params.i18n_make_a_selection_text );
            }
            
            return;
        }

        $('input[name=add-to-cart]').remove();        

        $thisbutton.removeClass( 'added' );
        $thisbutton.addClass( 'loading' );

        //var data = new FormData($('form.cart')[0]);
        var data = new FormData( $(event.target).parents( "form" )[0] );
        data.append('product_type', $(event.target).data('product-type'));
        data.append('product_id', $(event.target).data('product-id'));
        data.append('is_quote', $(event.target).data('is_quote'));

        if($('.reponse_to_quote').length == 0) {
            $container.parent().append('<div class="reponse_to_quote"></div>');
        }

        $.ajax({
            url: adqAjax.ajaxurl+'?action=add_to_quote',
            type: 'POST',
            // Form data
            data: data,
            async: false,
            success: function(response){

                if( response.message != '') {
                    $thisbutton.removeClass( 'loading' );
                    $thisbutton.addClass( 'added' );

                    $('.reponse_to_quote').html(response.message);
                }
                else {
                    var this_page = window.location.toString();

                    if( adqAjax.redirectUrl && response.result != 0) {
                        this_page = adqAjax.redirectUrl;
                    }

                    window.location = this_page;
                }
                updateAddedItems();

                // Custom event for when variation selection has been changed
                $thisbutton.trigger( 'adq_to_quote_has_fired' );

                return;
            },
            //Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json'
        });
        return false;
    };

    $(document).on('click', '#add_to_quote', addToQuoteHandler);

    $(document).on('click', '#add_to_quote_loop', function(){    
        
        var $thisbutton = $( this );
        
        $thisbutton.removeClass( 'added' );
        $thisbutton.addClass( 'loading' );
        
        var e = $thisbutton.parent('.single_add_to_quote_loop').parent();
        if(e.find('.reponse_to_quote').length == 0) {
            e.append('<div class="reponse_to_quote"></div>');
        }
        
        $.post(
            adqAjax.ajaxurl, 
            {
                'action': 'add_to_quote',
                'product_id' : $(this).data('product-id'),
                'quantity' : $(this).data('quantity'),
                'is_quote' : $(this).data('is_quote'),
            }, 
            function(response) {     
                
                    if( response.message != '') {
                            $thisbutton.removeClass( 'loading' );
                            $thisbutton.addClass( 'added' );
                            
                            e.find('.reponse_to_quote').html(response.message);                            
                    }
                    else { 
                        var this_page = window.location.toString();  

                        if( adqAjax.redirectUrl && response.result != 0) {
                            this_page = adqAjax.redirectUrl; 
                        }

                        window.location = this_page;
                    }
                    updateAddedItems();
                    
                    // Custom event for when variation selection has been changed
                    $thisbutton.trigger( 'adq_to_quote_has_fired' );
                    
                    return;
            },
            'json'
        );
        return false;
    });
    
    
    $(document).on('adq_to_quote_has_fired', function(){ 
            ( typeof widget_shopping_hide_if_empty !== 'undefined' ) &&
            $.post(
                    adqAjax.ajaxurl, 
                    {
                        'action': 'draw_widget_quote',
                        'hide_if_empty': widget_shopping_hide_if_empty.value,
                    }, 
                    function(response) { 
                            $('.widget_shopping_quote_list_content').closest( '.adq_shopping_cart' ).show();
                            $('.widget_shopping_quote_list_content').html(response);
                    },
                    'html'
            );
    });
    
    
    $(document).on('click', '#remove_all_items', function(){
            
            $.post(
                adqAjax.ajaxurl, 
                {
                    'action': 'remove_all_list',
                }, 
                function(response){                    
                    var this_page = window.location.toString();                

                    window.location = this_page;
                    return;                    
                },
                'json'
            );
                
            return false;
    });

    $(document).on('change', '#include-shipping-cost, #ship-to-different-address input, #billing_country, #billing_state, input#billing_postcode, #billing_city, input#billing_address_1, input#billing_address_2, #shipping_country, #shipping_state, input#shipping_postcode, #shipping_city, input#shipping_address_1, input#shipping_address_2', function() {

        $('.adq-shipping').block({
            message: null,
            overlayCSS: {
                background: '#fff',
                opacity: 0.6
            }
        })

        var country          = $( '#billing_country' ).val(),
            state            = $( '#billing_state' ).val(),
            postcode         = $( 'input#billing_postcode' ).val(),
            city             = $( '#billing_city' ).val(),
            address          = $( 'input#billing_address_1' ).val(),
            address_2        = $( 'input#billing_address_2' ).val(),
            s_country        = country,
            s_state          = state,
            s_postcode       = postcode,
            s_city           = city,
            s_address        = address,
            s_address_2      = address_2;



        if ( $( '#ship-to-different-address' ).find( 'input' ).is( ':checked' ) ) {
            s_country        = $( '#shipping_country' ).val();
            s_state          = $( '#shipping_state' ).val();
            s_postcode       = $( 'input#shipping_postcode' ).val();
            s_city           = $( '#shipping_city' ).val();
            s_address        = $( 'input#shipping_address_1' ).val();
            s_address_2      = $( 'input#shipping_address_2' ).val();
        }

        var data = {
            country                 : country,
            state                   : state,
            postcode                : postcode,
            city                    : city,
            address                 : address,
            address_2               : address_2,
            s_country               : s_country,
            s_state                 : s_state,
            s_postcode              : s_postcode,
            s_city                  : s_city,
            s_address               : s_address,
            s_address_2             : s_address_2,
            include_shipping_cost   : $('#include-shipping-cost').is(':checked')
        };
        
        $.ajax({
            url         : adqAjax.ajaxurl+'?action=update_shipping_methods',
            dataType    : 'html',
            data        : data
        })
        .done(function(data, textStatus, jqXHR) {
            $('.adq-shipping').html(data);
            $('.adq-shipping').unblock();
            console.log("success");
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            $('.adq-shipping').unblock();
            console.log("error");
        }); 
    });


    $(document).on('click', '.remove_quote_item', function(){
            removeItem ( $(this), true );
            
            return false;
    });
    
    /**
     *  Deprecated since 2.3.17
     */
    
    /*$(document).on('change', '.adq_qty_list', function(){                                 
        updateQuantity ( $(this), $(this).val() );
        
        return false;
    });
    
    $(document).on('click', 'input.minus', function(){ 
            var item = $(this).next();
            updateQuantity ( item, parseInt( item.val() ) - 1 );

            return false;
    });
    
    $(document).on('click', 'input.plus', function(){   
            var item = $(this).prev();
            updateQuantity ( item, parseInt( item.val() ) + 1 );

            return false;
    });
    
    function updateQuantity (item, qty) {
            $.post(
                adqAjax.ajaxurl, 
                {
                    'action': 'add_quantity',
                    'cart_item_key' : item.data('cart_item_key'),
                    'product_id' : item.data('product_id'),
                    'quantity' : qty,
                }, 
                function(response){
                    var this_page = window.location.toString();                

                    window.location = this_page;
                    return;
                },
                'json'
            );
    }
    */
   
    function removeItem (item, redirect) {            
            $.post(
                adqAjax.ajaxurl, 
                {
                    'action': 'remove_from_list',
                    'cart_item_key' : item.data('cart_item_key'),
                    'product_id' : item.data('product_id')
                }, 
                function(response){
                    if(redirect) {
                        var this_page = window.location.toString();                

                        window.location = this_page;
                        return;
                    }
                },
                'json'
            );
    }

    function updateAddedItems () {
        $.post(
                adqAjax.ajaxurl, 
                {
                    'action': 'get_added_items_content'
                }, 
                function(response) { 
                    $('.widget_added_items_content').html($(response)[0].innerHTML);
                },
                'html'
        );
    }

    //cart_item_key
    $(document).on('keyup', '.quote_product_meta', function(){  
        if( ajaxReq ) {
            ajaxReq.abort();
        }
        
        var ajaxReq = $.post(
            adqAjax.ajaxurl, 
            {
                'action': 'add_quote_item_meta',
                'cart_item_key': $(this).data('cart_item_key'),
                'meta_value': $(this).val(),
                'meta_key': $(this).attr('name')
            }, 
            function(response){
            },
            'json'
        );
        return false;
    });
    
    
    /**
    * Order Notes Panel
    */
    var wc_meta_boxes_order_notes = {
           init: function() {
                   $( 'div.add_note' )
                           .on( 'click', 'a.add_note', this.add_order_note )
                           .on( 'click', 'a.delete_note', this.delete_order_note );

           },

           add_order_note: function() {
                   if ( ! $( 'textarea#add_order_note' ).val() ) {
                           return;
                   }

                   $( 'div.add_note' ).block({
                           message: null,
                           overlayCSS: {
                                   background: '#fff',
                                   opacity: 0.6
                           }
                   });

                   var data = {
                           action:    'adq_add_order_note',
                           post_id:   $(this).data('post_id'),
                           note:      $( 'textarea#add_order_note' ).val(),
                           note_type: $( 'input#order_note_type' ).val(),
                           security:  adqAjax.add_order_note_nonce,                           
                   };

                   $.post( adqAjax.ajaxurl, data, function( response ) {
                            $( 'ol.commentlist' ).prepend( response );
                            $( 'div.add_note' ).unblock();
                            $( '#add_order_note' ).val( '' );
                           
                            var this_page = window.location.toString();
                            window.location = this_page;
                   });

                   return false;
           },
    };
    
    wc_meta_boxes_order_notes.init();
    
    
    
    /* NOT Ajax */
    
    $( 'a.showlogin' ).click( function() {
            $( 'form.login' ).slideToggle();

            return false;
    });       
    
    $('a.added_to_quote').slideDown( 200 );
    
    $('a.showbilling').click( function() {
            $( 'div.adq-billing' ).slideToggle();
            return false;
    });
    
    $('a.show_product_meta').click( function () {            
            $('.product_meta_'+$(this).data('cart_item_key')).slideToggle( 200 );
            $(this).slideToggle('fast');
            return false;
    });
    
    var toggleShippingAddress = function() {
        if ($('#ship-to-different-address-checkbox').is(':checked')) {
                $('div.shipping_address').slideDown( 200 );
        }
        else {
                $('div.shipping_address').slideUp( 200 );
        }
    };

    var toggleShippingFields = function() {
        if ( $('#include-shipping-cost').is(':checked') ) {
            $('div.woocommerce-shipping-fields, div.adq-shipping').slideDown( 200 );
        }
        else if ($('#include-shipping-cost').length > 0) {
            $('div.woocommerce-shipping-fields, div.adq-shipping').slideUp( 200 );
        }
    }
    
    var toggleAdqShipping = function() {
        if ($('#adq_shipping_method').is(':checked')) {
                $('.adq-shipping').slideDown( 200 );
        }
        else {
                $('.adq-shipping').slideUp( 200 );
        }
    };
    
    $( '#ship-to-different-address-checkbox' ).on( 'change', toggleShippingAddress );
    $('#include-shipping-cost').on('change', toggleShippingFields);
    
    $( '#adq_shipping_method' ).on( 'click', toggleAdqShipping );
    
    if (typeof($( '#adq_shipping_method' )) != 'undefined' && $( '#adq_shipping_method' ) != null) {
            //toggleAdqShipping();
            toggleShippingAddress();
            toggleShippingFields();
    }
    
    $( 'input#createaccount' ).change( function() {
            $( 'div.create-account' ).hide();

            if ( $( this ).is( ':checked' ) ) {
                    $( 'div.create-account' ).slideDown();
            }
    }).change();
    
    $( 'body' ).on("country_to_state_changing", function(){
            $(".adq-billing .field-hidden").each( function() {    
                    $(this).hide();
            });
    });
    
});