(function () {
    'use strict';

    mpApp
        .factory('WidgetService', WidgetService);
        WidgetService.$inject = ['$http', 'BASE_URL'];
    function WidgetService($http, BASE_URL) {
        var service = {};

        service.GetAllWidget = GetAllWidget;
        service.GetWidgetById = GetWidgetById;
        service.UploadWidget = UploadWidget;
        service.GetWidgetDetails = GetWidgetDetails;
        service.Update = Update;
        service.Delete = Delete;
        service.GetWidgetJson = GetWidgetJson;
        service.MakeComment =MakeComment;
        service.GetAllComments = GetAllComments;
        service.saveFile = saveFile;
        return service;

        function GetAllWidget() {
            return $http.get(BASE_URL + '/widgets').then(handleSuccess, handleError('Error getting all widget'));
        }

        function GetWidgetById(id) {
            return $http.get(BASE_URL + '/widget/' + id).then(handleSuccess, handleError('Error getting widget by id'));
        }

        function UploadWidget(widget) {
            return $http.get(BASE_URL + '/uploadWidget' , widget).then(handleSuccess, handleError('Error uploading widget'));
        }

        function GetWidgetDetails(id) {
            return $http.post(BASE_URL + '/widgetDetails/'+ id).then(handleSuccess, handleError('Error widget detail getting by id'));
        }

        function Update(widget) {
            return $http.put(BASE_URL + '/update/' + widget.id, widget).then(handleSuccess, handleError('Error updating widget'));
        }

        function Delete(id) {
            return $http.delete(BASE_URL + '/delete/' + id).then(handleSuccess, handleError('Error deleting widget'));
        }
        function GetAllComments(wid){
            return $http.get(BASE_URL + '/comment/'+ wid).then(handleSuccess, handleError('Error widget comments getting by id'));
        }


        function GetWidgetJson(id) {
            return $http.get(BASE_URL + '/getWidgetJson/' + id).then(function(response){
                var contentDisposition = response.headers('Content-Disposition');
                var filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
                var json = JSON.stringify(response.data);
                var blob = new Blob([json], {type: "octet/stream"});
                saveFile(blob, filename);

                var isChrome = !!window.chrome && !!window.chrome.webstore;
                var isIE = /*@cc_on!@*/false || !!document.documentMode;
                var isEdge = !isIE && !!window.StyleMedia;


                if (isChrome){
                    var url = window.URL || window.webkitURL;

                    var downloadLink = angular.element('<a></a>');
                    downloadLink.attr('href',url.createObjectURL(file));
                    downloadLink.attr('target','_self');
                    downloadLink.attr('download', filename);
                    downloadLink[0].click();
                }
                else if(isEdge || isIE){
                    window.navigator.msSaveOrOpenBlob(file);

                }
                else {
                    var fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                }

            }, handleError('Error deleting widget'));
        }

        function MakeComment(c) {
            return $http.post(BASE_URL + '/makeComment', c).then(handleSuccess, handleError('Error make comment form'));
        }
        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

        function saveFile(blob, filename) {
            if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob, filename);
            } else {
              const a = document.createElement('a');
              document.body.appendChild(a);
              const url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = filename;
              a.click();
              setTimeout(() => {
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
              }, 0)
            }
          }
    }

})();