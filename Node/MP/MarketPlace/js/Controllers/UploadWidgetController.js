angular.module("main").controller("UploadWidgetController", ['$scope', '$location', '$rootScope', 'UserService', '$timeout', 'FlashService', '$routeParams', 'WidgetService', '$timeout',
    function ($scope, $location, $rootScope, UserService, $timeout, FlashService, $routeParams, WidgetService, $timeout) {

        $scope.widgetId = $routeParams.id;
        $scope.widgetImages= [];
        $scope.upload = {
            title: '',
            type: '',
            rate: 0,
            description: '',
            image: '',
            purchase_option: 'free',
            size: '',
            downloaded: '',
            refresh: 0,
            no_of_comments: '',
            download_link: '',
            details: '',
            features: '',
            seller_name: '',
            comment_id: '',
            file_path: '',
            price: 0,
            video_url: '',
            created_date: '',
            last_update_date: ''
        }
        $scope.coverpageLable = "Cover Widget Image";
        $scope.dataLoading = false;

        $scope.getWidgetDetails = function () {
            if ($scope.widgetId) {
                WidgetService.GetWidgetById($scope.widgetId).then(function (data) {
                    $scope.upload = data[0];
                });
            }
        }
        $scope.getWidgetDetails();

        $scope.uploadFile = {
            widgetFile: null,
            widgetCoverImage: null,
            widgetImages: []
        }
        $scope.coverpageLable = "Cover Widget Image";

        $scope.uploadWidget = function (file) {
            if (file) {
                const aReader = new FileReader();
                aReader.readAsText(file, "UTF-8");
                aReader.onload = function (evt) {
                    let fileContent = JSON.parse(aReader.result);
                    // var fileName = file.name;
                    $scope.$apply(function () {
                        $scope.upload['size'] = file.size;
                        $scope.upload['title'] = fileContent.widget.widgetName;
                        $scope.upload['type'] = fileContent.widget.widgetType;
                        $scope.uploadFile['widgetFile'] = file;
                    });
                }
                aReader.onerror = function (evt) {
                    FlashService.Error('Error while file read');
                    $scope.$apply(function () { $scope.uploadFile['widgetFile'] = null; });
                }
            }
        }

        $scope.uploadImage = function (file) {
            if (file) {
                const aReader = new FileReader();
                aReader.readAsText(file, "UTF-8");
                aReader.onload = function (e) {
                    let fileName = file.name;
                    $scope.$apply(function () {
                        $scope.coverpageLable = fileName;
                        $scope.uploadFile['widgetCoverImage'] = file;
                    });
                    let url = URL.createObjectURL(file);
                    $('#customImg').attr('src', url);
                }
                aReader.onerror = function (evt) {
                    $scope.$apply(function () { $scope.uploadFile['widgetCoverImage'] = null; });
                    FlashService.Error('Error while Image read');
                    $('#customImg').attr('src', 'images/dflwidg.png');
                }
            } else {
                $scope.$apply(function () { $scope.uploadFile['widgetCoverImage'] = null; });
                $('#customImg').attr('src', 'images/dflwidg.png');
            }
        }

        $scope.uploadFileValidate = function () {
            var formData = new FormData();
            angular.forEach($scope.upload, function (value, key) {
                formData.append(key, value);
            });

            if ($scope.uploadFile['widgetFile']) {
                formData.append('widgetFile', $scope.uploadFile['widgetFile'], $scope.uploadFile['widgetFile'].name);
            } else {
                FlashService.Error("Upload Widget File");
                return;
            }
            if ($scope.uploadFile['widgetCoverImage']) {
                formData.append('coverImage', $scope.uploadFile['widgetCoverImage'], $scope.uploadFile['widgetCoverImage'].name);
            } else {
                FlashService.Error("Upload Cover Image with dimentions 800px X 800px");
                return;
            }
            UserService.UploadWidget(formData).then(function (res) {
                if(res.message == 'success'){
                    $location.path( '/widgets');
                    $timeout(function(){
                        FlashService.Success(res.message);
                    }, 1500);
                } else{
                    FlashService.Error(res.message);
                }                
            });
        }

        $scope.editWidget = function () {
            var formData = new FormData();
            angular.forEach($scope.upload, function (value, key) {
                formData.append(key, value);
            });
            if ($scope.uploadFile['widgetFile']) {
                formData.append('widgetFile', $scope.uploadFile['widgetFile'], $scope.uploadFile['widgetFile'].name);
            }
            if ($scope.uploadFile['widgetCoverImage']) {
                formData.append('coverImage', $scope.uploadFile['widgetCoverImage'], $scope.uploadFile['widgetCoverImage'].name);
            }

            UserService.EditWidget($scope.widgetId, formData).then(function (res) {
                $timeout(function(){
                    FlashService.Success(res.message);
                }, 1500);
            });
        }

        $scope.onsubmit = function () {
            if ($scope.widgetId) {
                $scope.editWidget();
                $location.path('/widgets');
            } else {
                $scope.uploadFileValidate();
            }
            $scope.dataLoading = false;
        }

        var highlightedItems = document.querySelectorAll('.custom-file-input');
        highlightedItems.forEach(function (item) {
            item.addEventListener('change', function (e) {
                if (e.target.files.length == 1) {
                    var fileName = e.target.files[0].name;
                    var nextSibling = e.target.nextElementSibling
                    nextSibling.querySelector('.cst_fnm_lbl').innerText = fileName;
                    if (e.target.parentElement.id == "2") { // widget upload
                        $scope.uploadWidget(e.target.files[0]);
                    } else if (e.target.parentElement.id == "1") { // Image upload
                        $timeout($scope.uploadImage(e.target.files[0]));
                    } 
                } else {
                    var fileName = [];
                    angular.forEach(e.target.files, function (value, key) {
                        fileName.push(value.name);
                    });
                    var nextSibling = e.target.nextElementSibling
                    nextSibling.querySelector('.cst_fnm_lbl').innerText = fileName.join(', ');
                    if (e.target.parentElement.id == "3") { // Widget Images
                        $scope.uploadWidgetshowCase(e.target.files);
                    }
                }
            });
        });

        $scope.cancel = function () {
            $location.path('/widget_details/' + $scope.widgetId);
        }

        $scope.uploadWidgetshowCase = function(files){
            if (files) {
                angular.forEach( files, function (file){
                    const aReader = new FileReader();
                    // aReader.readAsText(file, "UTF-8");
                    aReader.onload = function (evt) {
                        let fileName = file.name;
                        $scope.$apply(function () {
                            // $scope.upload['size'] = file.size;
                            // $scope.upload['title'] = fileContent.widget.widgetName;
                            // $scope.upload['type'] = fileContent.widget.widgetType;
                            // $scope.uploadFile['widgetFile'] = file;
                            const objectURL = window.URL.createObjectURL(new Blob([evt.target.result], {type: file.type}))                        
                            $scope.widgetImages.push(evt.target.result);
                            $scope.uploadFile.widgetImages.push(file);
                            
                        });
                    }
                    aReader.readAsDataURL(file);
                    
                    aReader.onerror = function (evt) {
                        FlashService.Error('Error while file read');
                        $scope.$apply(function () { $scope.uploadFile['widgetFile'] = null; });
                    }
                });
            }
        }

        $scope.loadImage = function (event, x) {
            event.target.src = window.URL.createObjectURL(x);
        }

    }]);