mpApp.controller("widgetController",   ['$scope','$routeParams','WidgetService', '$timeout','BASE_URL',
    function ($scope, $routeParams, WidgetService, $timeout, BASE_URL){    
        $scope.base = BASE_URL;
    $scope.srtPrice = '';
    $scope.srtName = '';
    $scope.widgetParam = $routeParams.widgetParam;
    $scope.tempWidgets = [];
    $scope.widgetData= [];
    
    $scope.getAllWidget = function(){
        WidgetService.GetAllWidget().then(function successCallback(data) {
            $scope.tempWidgets = data;
            $scope.changeData();
        });
    }
    
    $scope.getAllWidget();

    $scope.changeData = function(){
        if($scope.widgetParam){
            $scope.widgetData = [];
            angular.forEach($scope.tempWidgets,function(value,index){
                if($scope.widgetParam.indexOf(value.type) > -1){
                    $scope.widgetData.push(value);
                }
            });
        } else {
            $scope.widgetData = [];
            $scope.widgetData = angular.copy($scope.tempWidgets);
        }
    }
    

    $scope.changeType = function(type){
        $scope.widgetParam = type;
        $scope.changeData();

    }

    $scope.sortByName = function(){
        if($scope.srtName == 'ASC'){
            $scope.widgetData.sort();
        } else if ($scope.srtName == 'DESC'){
            $scope.widgetData.sort();
            $scope.widgetData.reverse();
        }
    }

    $scope.sortByPrice = function(){
        if($scope.srtPrice != ""){
            $scope.widgetData = [];
            angular.forEach($scope.tempWidgets,function(value,index){
                if(value.purchase_option.toUpperCase() == $scope.srtPrice.toUpperCase()){
                    $scope.widgetData.push(value);
                }
            });
        } else {
            $scope.widgetData = [];
            $scope.widgetData = angular.copy($scope.tempWidgets);
        }
    }
}]);