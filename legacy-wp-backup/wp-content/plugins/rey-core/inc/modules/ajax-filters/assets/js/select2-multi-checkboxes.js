/**
 * jQuery Select2 Multi checkboxes
 * - allow to select multi values via normal dropdown control
 *
 * author      : wasikuss
 * repo        : https://github.com/wasikuss/select2-multi-checkboxes
 * inspired by : https://github.com/select2/select2/issues/411
 * License     : MIT
 */
(function ($) {
	var S2MultiCheckboxes = function (options, element) {

		var self = this;
		var $element = $(element),
			values = $element.val(),
			settings = $.extend({
				allowClear: true,
				closeOnSelect: false,
				searchMatchOptGroups: true,
				containerCssClass: '',
				dropdownCssClass: '',
				templateSelection: function (selected, total) {
					return selected.length + ' > ' + total + ' total';
				},
				templateResult: function (result) {
					return result.text;
				},
				matcher: function (params, data) {
					var original_matcher = $.fn.select2.defaults.defaults.matcher;
					var result = original_matcher(params, data);
					if (result && data.children && result.children && data.children.length != result.children.length) {
						result.children = data.children;
					}
					return result;
				},
			}, options);

		$element.removeAttr('multiple');

		var select2 = $element.select2(settings).data('select2');

		select2.$results.off("mouseup").on("mouseup", ".select2-results__option[aria-selected]", (function (self) {
			return function (evt) {
				var $this = $(this);

				const Utils = $.fn.select2.amd.require('select2/utils');
				var data = Utils.GetData(this, 'data');

				if ($this.attr('aria-selected') === 'true') {
					self.trigger('unselect', {
						originalEvent: evt,
						data: data
					});
					return;
				}

				self.trigger('select', {
					originalEvent: evt,
					data: data
				});
			}
		})(select2));

		$element.attr('multiple', 'multiple').val(values).trigger('change.select2');
	}

	$.fn.extend({
		select2MultiCheckboxes: function (options) {
			this.each(function () {
				new S2MultiCheckboxes(options, this);
			});
		}
	});
})(jQuery);
