<?php

// this is the URL our updater / license checker pings. This should be the URL of the site with EDD installed
define( 'EDD_ADQ_STORE_URL', 'https://woocommercequoteplugin.com/' ); // you should use your own CONSTANT name, and be sure to replace it throughout this file

// the name of your product. This should match the download name in EDD exactly
define( 'EDD_ADQ_ITEM_NAME', 'REQUEST FOR QUOTE PLUGIN FOR WOOCOMMERCE' ); // you should use your own CONSTANT name, and be sure to replace it throughout this file

// the name of the settings page for the license input to be displayed
define( 'EDD_ADQ_PLUGIN_LICENSE_PAGE', 'woocommerce-quotation-license' );

if( !class_exists( 'EDD_SL_Plugin_Updater' ) ) {
	// load our custom updater
	include( dirname( __FILE__ ) . '/EDD_SL_Plugin_Updater.php' );
}

function edd_sl_adq_updater() {

	// retrieve our license key from the DB
	$license_key = trim( get_option( 'edd_adq_license_key' ) );

	// setup the updater
	$edd_updater = new EDD_SL_Plugin_Updater( EDD_ADQ_STORE_URL, ADQ_PLUGIN_FILE, array( 
			'version' 	=> ADQ_VERSION, 	// current version number
			'license' 	=> $license_key, 	// license key (used get_option above to retrieve from DB)
			'item_name' 	=> EDD_ADQ_ITEM_NAME, 	// name of this plugin
			'author' 	=> 'Aldaba Digital'  	// author of this plugin
		)
	);

}
add_action( 'admin_init', 'edd_sl_adq_updater', 0 );


/************************************
* the code below is just a standard
* options page. Substitute with 
* your own.
*************************************/
/*function edd_adq_license_menu() {
	add_plugins_page( 'Plugin License', 'Plugin License', 'manage_options', EDD_ADQ_PLUGIN_LICENSE_PAGE, 'edd_adq_license_page' );
}
add_action('admin_menu', 'edd_adq_license_menu');*/

function edd_adq_license_page() {
	$license 	= get_option( 'edd_adq_license_key' );
	$status 	= get_option( 'edd_adq_license_status' );
	?>
	<div class="wrap">
		<h2><?php _e('Woocommerce Quotation License Options', 'woocommerce-quotation'); ?></h2>
				
			<?php settings_fields('edd_adq_license'); ?>

			<style>
				.info {
					min-height: 2.2em;
				}

				.info table {
					margin-top: 20px;
					border-top: 1px solid #CCC;
				}

				.info .valid thead th {
				    color: green;
				}

				.info .invalid thead th {
				    color: green;
				}

				.info th, .info td {
				    padding: 5px;
				}

			</style>
			
			<table class="form-table">
				<tbody>
					<tr valign="top">	
						<th scope="row" valign="top">
							<?php _e('License Key', 'woocommerce-quotation'); ?>
						</th>
						<td>
							<input id="edd_adq_license_key" name="edd_adq_license_key" type="text" class="regular-text" value="<?php esc_attr_e( $license ); ?>" />
							<label class="description" for="edd_adq_license_key"><?php _e('Enter your license key', 'woocommerce-quotation'); ?></label>
						</td>
					</tr>
					<?php if( false !== $license ) { 

						$api_params = array( 
							'license' 	=> $license, 
							'item_name' => urlencode( EDD_ADQ_ITEM_NAME ),
							'url'       => home_url(),
							'ajaxurl' 	=> admin_url( 'admin-ajax.php' )
						);
						wp_localize_script( 'edd-ajax-requests', 'api_params', $api_params ); ?>

						<tr valign="top">	
							<th scope="row" valign="top">
								<?php _e('Activate License', 'woocommerce-quotation'); ?>
							</th>
							<td>
								<?php if( $status !== false && $status == 'valid' ) { ?>
									<span style="color:green;"><?php _e('Active license', 'woocommerce-quotation'); ?></span>
									<?php wp_nonce_field( 'edd_adq_nonce', 'edd_adq_nonce' ); ?>
									<input type="submit" class="button-secondary" name="edd_license_deactivate" value="<?php _e('Deactivate License', 'woocommerce-quotation'); ?>"/>
									&nbsp;&nbsp;&nbsp;
									<button id="check-status-button" type="button" class="button-secondary"><?php _e( 'Check status', 'woocommerce-quotation' ); ?></button>
									<button id="check-version-button" type="button" class="button-secondary"><?php _e( 'Check version', 'woocommerce-quotation' ); ?></button>
									<div class="info">
										
									</div>
								<?php } else {
									wp_nonce_field( 'edd_adq_nonce', 'edd_adq_nonce' ); ?>
									<input type="submit" class="button-secondary" name="edd_license_activate" value="<?php _e('Activate License', 'woocommerce-quotation'); ?>"/>
								<?php } ?>								
							</td>
						</tr>
					<?php } ?>
				</tbody>
			</table>				
	<?php
}

function edd_adq_register_option() { 
        //Hack
        if( isset( $_POST['edd_adq_license_key'] ) ) {            
            update_option( 'edd_adq_license_key', trim( $_POST['edd_adq_license_key'] ));
        }
	// creates our settings in the options table
	register_setting('edd_adq_license', 'edd_adq_license_key', 'edd_adq_sanitize_license' );
}
add_action('admin_init', 'edd_adq_register_option');

function edd_adq_sanitize_license( $new ) {
	$old = get_option( 'edd_adq_license_key' );
	if( $old && $old != $new ) {
		delete_option( 'edd_adq_license_status' ); // new license has been entered, so must reactivate
	}
	return $new;
}



/************************************
* this illustrates how to activate 
* a license key
*************************************/

function edd_adq_activate_license() {

	// listen for our activate button to be clicked
	if( isset( $_POST['edd_license_activate'] ) ) {

		// run a quick security check 
	 	if( ! check_admin_referer( 'edd_adq_nonce', 'edd_adq_nonce' ) ) 	
			return; // get out if we didn't click the Activate button

		// retrieve the license from the database
		$license = trim( get_option( 'edd_adq_license_key' ) );
			

		// data to send in our API request
		$api_params = array( 
			'edd_action'=> 'activate_license', 
			'license' 	=> $license, 
			'item_name' => urlencode( EDD_ADQ_ITEM_NAME ), // the name of our product in EDD
			'url'       => home_url()
		);
		
		// Call the custom API.
		$response = wp_remote_get( add_query_arg( $api_params, EDD_ADQ_STORE_URL ), array( 'timeout' => 15, 'sslverify' => false ) );                

		// make sure the response came back okay
		if ( is_wp_error( $response ) )
			return false;

		// decode the license data
		$license_data = json_decode( wp_remote_retrieve_body( $response ) );
		
		// make sure the response came back okay
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {

			if ( is_wp_error( $response ) ) {
				$message = $response->get_error_message();
			} else {
				$message = __( 'An error occurred, please try again.' );
			}

		} else {

			$license_data = json_decode( wp_remote_retrieve_body( $response ) );

			if ( false === $license_data->success ) {

				switch( $license_data->error ) {

					case 'expired' :

						$message = sprintf(
							__( 'Your license key expired on %s.' ),
							date_i18n( get_option( 'date_format' ), strtotime( $license_data->expires, current_time( 'timestamp' ) ) )
						);
						break;

					case 'revoked' :

						$message = __( 'Your license key has been disabled.' );
						break;

					case 'missing' :

						$message = __( 'Invalid license.' );
						break;

					case 'invalid' :
					case 'site_inactive' :

						$message = __( 'Your license is not active for this URL.' );
						break;

					case 'item_name_mismatch' :

						$message = sprintf( __( 'This appears to be an invalid license key for %s.' ), EDD_ADQ_ITEM_NAME );
						break;

					case 'no_activations_left':

						$message = __( 'Your license key has reached its activation limit.' );
						break;

					default :

						$message = __( 'An error occurred, please try again.' );
						break;
				}

			}

		}

		// Check if anything passed on a message constituting a failure
		if ( ! empty( $message ) ) {
			$base_url = admin_url( 'admin.php?page=wc-settings&tab=quotes&section=licence' );
			$redirect = add_query_arg( array( 'sl_activation' => 'false', 'message' => urlencode( $message ) ), $base_url );

			wp_redirect( $redirect );
			exit();
		}

		// $license_data->license will be either "valid" or "invalid"

		update_option( 'edd_adq_license_status', $license_data->license );
		wp_redirect( admin_url( 'admin.php?page=wc-settings&tab=quotes&section=licence' ) );
		exit();

	}
}
add_action('admin_init', 'edd_adq_activate_license');


/***********************************************
* Illustrates how to deactivate a license key.
* This will descrease the site count
***********************************************/

function edd_adq_deactivate_license() {

	// listen for our activate button to be clicked
	if( isset( $_POST['edd_license_deactivate'] ) ) {

		// run a quick security check 
	 	if( ! check_admin_referer( 'edd_adq_nonce', 'edd_adq_nonce' ) ) 	
			return; // get out if we didn't click the Activate button

		// retrieve the license from the database
		$license = trim( get_option( 'edd_adq_license_key' ) );
			

		// data to send in our API request
		$api_params = array( 
			'edd_action'=> 'deactivate_license', 
			'license' 	=> $license, 
			'item_name' => urlencode( EDD_ADQ_ITEM_NAME ), // the name of our product in EDD
			'url'       => home_url()
		);
		
		// Call the custom API.
		$response = wp_remote_get( add_query_arg( $api_params, EDD_ADQ_STORE_URL ), array( 'timeout' => 15, 'sslverify' => false ) );

		// make sure the response came back okay
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {

			if ( is_wp_error( $response ) ) {
				$message = $response->get_error_message();
			} else {
				$message = __( 'An error occurred, please try again.' );
			}

			$base_url = admin_url( 'admin.php?page=wc-settings&tab=quotes&section=licence' );
			$redirect = add_query_arg( array( 'sl_activation' => 'false', 'message' => urlencode( $message ) ), $base_url );

			wp_redirect( $redirect );
			exit();
		}

		// decode the license data
		$license_data = json_decode( wp_remote_retrieve_body( $response ) );
		
		// $license_data->license will be either "deactivated" or "failed"
		if( $license_data->license == 'deactivated' )
			delete_option( 'edd_adq_license_status' );

		wp_redirect( admin_url( 'admin.php?page=wc-settings&tab=quotes&section=licence' ) );
		exit();

	}
}
add_action('admin_init', 'edd_adq_deactivate_license');


/************************************
* this illustrates how to check if 
* a license key is still valid
* the updater does this for you,
* so this is only needed if you
* want to do something custom
*************************************/

function edd_adq_check_license() {

	global $wp_version;

	$license = trim( get_option( 'edd_adq_license_key' ) );
		
	$api_params = array( 
		'edd_action' => 'check_license', 
		'license' => $license, 
		'item_name' => urlencode( EDD_ADQ_ITEM_NAME ),
		'url'       => home_url()
	);

	// Call the custom API.
	$response = wp_remote_get( add_query_arg( $api_params, EDD_ADQ_STORE_URL ), array( 'sslverify' => false ) );


	if ( is_wp_error( $response ) )
		return false;

	$license_data = json_decode( wp_remote_retrieve_body( $response ) );

	$output = '<table class="check_license ' . $license_data->license . '">
		<thead>
			<tr>
				<th>' . __( ucfirst( $license_data->license ) . ' license', 'woocommerce-quotation' ) . '</th>
				<td></td>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th>' . __( 'Expires on', 'woocommerce-quotation' ) . ':</th>
				<td>' . strftime('%x', strtotime($license_data->expires)) . '</td>
			</tr>
			<tr>
				<th>' . __( 'Customer name', 'woocommerce-quotation' ) . ':</th>
				<td>' . $license_data->customer_name . '</td>
			</tr>
			<tr>
				<th>' . __( 'Customer email', 'domain' ) . ':</th>
				<td>' . $license_data->customer_email . '</td>
			</tr>
		</tbody>
	</table>';

	echo $output; die();
}

add_action( 'wp_ajax_check_license', 'edd_adq_check_license' );
add_action( 'wp_ajax_nopriv_check_license', 'edd_adq_check_license' );

function edd_adq_get_version() {
	$license = trim( get_option( 'edd_adq_license_key' ) );
		
	$api_params = array( 
		'edd_action' 	=> 'get_version', 
		'license' 		=> $license, 
		'item_name' 	=> urlencode( EDD_ADQ_ITEM_NAME ),
		'url'       	=> home_url()
	);

	// Call the custom API.
	$response = wp_remote_get( add_query_arg( $api_params, EDD_ADQ_STORE_URL ), array( 'sslverify' => false ) );


	if ( is_wp_error( $response ) )
		return false;

	$license_data = json_decode( wp_remote_retrieve_body( $response ) );

	$output = '<table>
		<tbody>
			<tr>
				<th>' . __( 'Version', 'woocommerce-quotation' ) . ':</th>
				<td>' . $license_data->new_version . '</td>
			</tr>
			<tr>
				<th>' . __( 'Last update', 'woocommerce-quotation' ) . ':</th>
				<td>' . strftime('%x', strtotime($license_data->last_updated)) . '</td>
			</tr>
		</tbody>
	</table>';

	echo $output; die();
}

add_action( 'wp_ajax_get_version', 'edd_adq_get_version' );
add_action( 'wp_ajax_nopriv_get_version', 'edd_adq_get_version' );

/**
 * This is a means of catching errors from the activation method above and displaying it to the customer
 */
function edd_adq_admin_notices() {
	if ( isset( $_GET['sl_activation'] ) && ! empty( $_GET['message'] ) ) {

		switch( $_GET['sl_activation'] ) {

			case 'false':
				$message = urldecode( $_GET['message'] );
				?>
				<div class="error">
					<p><?php echo $message; ?></p>
				</div>
				<?php
				break;

			case 'true':
			default:
				// Developers can put a custom success message here for when activation is successful if they way.
				break;

		}
	}
}
add_action( 'admin_notices', 'edd_adq_admin_notices' );

if( !function_exists( 'edd_adq_admin_scripts' ) ) { 
    function edd_adq_admin_scripts () {
    	wp_enqueue_script( 'edd-ajax-requests', plugin_dir_url( __FILE__ ).'edd_ajax_requests.js', array( 'jquery', 'jquery-blockui', 'woocommerce_settings' ), null, true );
    }
    add_action( 'admin_enqueue_scripts', 'edd_adq_admin_scripts' );
}