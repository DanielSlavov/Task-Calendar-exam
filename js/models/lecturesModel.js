var app = app || {};

app.lecturesModel = (function () {
    function LecturesModel(requester) {
        this.requester = requester;
        this.serviceUrl = this.requester.baseUrl + 'appdata/' + this.requester.appId+'/Lectures/';
    }
    
    LecturesModel.prototype.getAllLectures = function () {
        var requestUrl = this.serviceUrl;
        return this.requester.get(requestUrl, true)
    }
    LecturesModel.prototype.getMyLectures = function () {
        var userId = sessionStorage['userId'];
        var requestUrl = this.serviceUrl + '?query={"_acl.creator":"' + userId + '"}';
        return  this.requester.get(requestUrl,true);
    }
    
    LecturesModel.prototype.addLecture = function (data) {
        var requestUrl = this.serviceUrl;
        return this.requester.post(requestUrl, data, true);
    }
    LecturesModel.prototype.editLecture = function (lecId,data) {
        var requestUrl = this.serviceUrl + lecId;
       return  this.requester.put(requestUrl, data, true);
    }
    LecturesModel.prototype.deleteLecture = function (lecId) {
        var requestUrl = this.serviceUrl + lecId;
       return  this.requester.delete(requestUrl, true);
    }


    return {
        load: function (requester) {
            return new LecturesModel(requester);
        }
    }
})();