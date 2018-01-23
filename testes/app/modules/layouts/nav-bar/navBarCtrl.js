(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:NavBarCtrl
	* @description
	* # NavBarCtrl
	* Controller of the app
	*/

	angular
		.module('ang-modular')
		.controller('NavBarCtrl', NavBar);

	NavBar.$inject = ['homeService', 'MenuService'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function NavBar(homeService, MenuService) {
		/*jshint validthis: true */
		var vm = this;
		vm.title = "ang-modular";

		vm.menu = MenuService.listMenu();

	}

})();
