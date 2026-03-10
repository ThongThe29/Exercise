angular.module('adminApp', ['ngSanitize'])
    .directive('quillEditor', function () {
        return {
            restrict: 'E',
            require: 'ngModel',
            template: '<div id="quill-editor"></div>',
            link: function (scope, element, attrs, ngModel) {
                var quill = new Quill(element.children()[0], {
                    theme: 'snow',
                    modules: {
                        toolbar: [
                            [{ 'header': [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'align': [] }],
                            ['link', 'image', 'video'],
                            ['clean']
                        ]
                    }
                });

                // Update model when quill changes
                quill.on('text-change', function () {
                    scope.$applyAsync(function () {
                        ngModel.$setViewValue(quill.root.innerHTML);
                    });
                });

                // Update quill when model changes
                ngModel.$render = function () {
                    if (ngModel.$viewValue) {
                        quill.root.innerHTML = ngModel.$viewValue;
                    } else {
                        quill.root.innerHTML = '';
                    }
                };
            }
        };
    })
    .controller('AdminController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
        const API_URL = 'http://localhost:4000/api/fashions';

        $scope.fashions = [];
        $scope.currentView = 'list'; // 'list', 'form', 'detail'
        $scope.formMode = 'add'; // 'add', 'edit'
        $scope.currentFashion = {};

        // Load Fashion List
        $scope.loadFashions = function () {
            $http.get(API_URL).then(function (response) {
                $scope.fashions = response.data;
            }, function (error) {
                console.error("Error loading fashions:", error);
                alert("Failed to load fashion data.");
            });
        };

        // Show List View
        $scope.showList = function () {
            $scope.currentView = 'list';
            $scope.currentFashion = {};
            $scope.loadFashions();
        };

        // Show Add Form
        $scope.showForm = function () {
            $scope.currentView = 'form';
            $scope.formMode = 'add';
            $scope.currentFashion = {
                title: '',
                style: '',
                thumbnail: '',
                details: ''
            };
        };

        // Show Edit Form
        $scope.editFashion = function (fashion) {
            $scope.currentView = 'form';
            $scope.formMode = 'edit';
            $scope.currentFashion = angular.copy(fashion);
        };

        // Show Detail View
        $scope.viewDetail = function (fashion) {
            $scope.currentView = 'detail';
            $scope.currentFashion = angular.copy(fashion);
        };

        // Save Fashion (Add or Edit)
        $scope.saveFashion = function () {
            if ($scope.formMode === 'add') {
                $http.post(API_URL, $scope.currentFashion).then(function (response) {
                    alert("Fashion added successfully!");
                    $scope.showList();
                }, function (error) {
                    console.error("Error adding fashion:", error);
                    alert("Failed to add fashion.");
                });
            } else {
                $http.put(API_URL + '/' + $scope.currentFashion._id, $scope.currentFashion).then(function (response) {
                    alert("Fashion updated successfully!");
                    $scope.showList();
                }, function (error) {
                    console.error("Error updating fashion:", error);
                    alert("Failed to update fashion.");
                });
            }
        };

        // Delete Fashion
        $scope.deleteFashion = function (id) {
            if (confirm("Are you sure you want to delete this fashion item?")) {
                $http.delete(API_URL + '/' + id).then(function (response) {
                    alert("Fashion deleted successfully!");
                    $scope.loadFashions();
                }, function (error) {
                    console.error("Error deleting fashion:", error);
                    alert("Failed to delete fashion.");
                });
            }
        };

        // Render HTML safely
        $scope.trustAsHtml = function (html) {
            return $sce.trustAsHtml(html);
        };

        // Initial load
        $scope.loadFashions();
    }]);
