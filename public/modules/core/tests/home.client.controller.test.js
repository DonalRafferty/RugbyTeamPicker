'use strict';

(function() {
    describe('HomeController', function() {
        //Initialize global variables
        var scope,
            HomeController,
            exampleTeamObject,
            $httpBackend;

        // Load the main application module
        beforeEach(module(ApplicationConfiguration.applicationModuleName));

        beforeEach(inject(function($controller, $rootScope, _$httpBackend_) {
            scope = $rootScope.$new();

            // Point global variables to injected services
            $httpBackend = _$httpBackend_;

            HomeController = $controller('HomeController', {
                $scope: scope
            });

            exampleTeamObject = { hookers: [] };

        }));

        it('should retrieve the list of ', function() {
            // Test expected GET request
            $httpBackend.expectGET('/squads').respond(200, [exampleTeamObject]);

            scope.getTeam();
            $httpBackend.flush();

            // Test scope value
            expect(scope.team).toEqual([exampleTeamObject]);
        });
    });
})();