'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http',
	function($scope, $http) {

        /**
         * Function to make the HTTP call to the API endpoint to get the players
         * Distance is supplied on the scope from form in HTML
         */
        $scope.getTeam = function(){
            $http.get('/squads').success(function (response) { //searchDistance comes from the HTML form
                $scope.team = response; //Got the customers
            }).error(function (response) {
                $scope.error = response.message; //Something failed, likely incorrect post body
            });
        };
	}
]);
