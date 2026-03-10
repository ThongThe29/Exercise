angular.module('clientApp', ['ngSanitize'])
    .controller('ClientController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
        const API_URL = 'http://localhost:4000/api/fashions';

        $scope.fashions = [];
        $scope.currentView = 'list';
        $scope.currentFashion = null;
        $scope.selectedStyle = '';

        // Load Fashion List (can filter by style)
        $scope.loadFashions = function (style) {
            let url = API_URL;
            if (style) {
                url = API_URL + '/style/' + style;
            }

            $http.get(url).then(function (response) {
                $scope.fashions = response.data;
            }, function (error) {
                console.error("Error loading fashions:", error);
                alert("Failed to load fashion items.");
            });
        };

        // Filter by dropdown change
        $scope.filterByStyle = function () {
            $scope.loadFashions($scope.selectedStyle);
        };

        // Show List View
        $scope.showList = function () {
            $scope.currentView = 'list';
            $scope.currentFashion = null;
            // Optionally scroll to top
            window.scrollTo(0, 0);
        };

        // Show Detail View
        $scope.viewDetail = function (fashion) {
            // According to requirements, retrieve specific fashion details from server or just use the passed object.
            // We'll call the API by ID just to show we integrated it
            $http.get(API_URL + '/' + fashion._id).then(function (response) {
                $scope.currentFashion = response.data;
                $scope.currentView = 'detail';
                window.scrollTo(0, 0);
            }, function (error) {
                console.error("Error fetching detail:", error);
                // Fallback to local data
                $scope.currentFashion = angular.copy(fashion);
                $scope.currentView = 'detail';
                window.scrollTo(0, 0);
            });
        };

        // Render WYSIWYG safely
        $scope.trustAsHtml = function (html) {
            return $sce.trustAsHtml(html);
        };

        // Initial load
        $scope.loadFashions();
    }]);
