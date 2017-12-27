'use strict';

const WebFontLoader = require('webfontloader')

// Webfont configuration.
let webFontConfig = WebFontLoader.Config = {
	google: {
		families: [
			'Roboto+Condensed:400',
			'Roboto:400,500,700',
			'Exo+2:300',
		],
	},
};

// Load webfonts
WebFontLoader.load(webFontConfig);

// Set up an image gallery if found.
if ($('.image-gallery').length) {
	$('.image-gallery').magnificPopup({
	delegate: 'a',
	type: 'image',
		gallery: {
			enabled: true,
			preload: [0, 1],
			arrowMarkup: '<button title=\'%title%\' type=\'button\' class=\'mfp-arrow mfp-arrow-%dir%\'></button>',
			navigateByImgClick: true,
			tPrev: 'Previous (Left arrow key)',
			tNext: 'Next (Right arrow key)',
			tCounter: '<span class="mfp-counter">%curr% of %total%</span>',
		},
		mainClass: 'mfp-img-mobile',
	});
}

function toggleMobileNavigation() {
	$('nav.page-navigation').toggle('drop');
}

function bindEventHandlers() {
	$('.hamburger-menu').on('click', toggleMobileNavigation);
}

$(document).ready(function(){
	bindEventHandlers();
});
