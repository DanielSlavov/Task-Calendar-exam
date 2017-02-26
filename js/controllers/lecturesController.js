var app = app || {};

app.lecturesController = (function () {
    function LecturesController(view, model) {
        this.view = view;
        this.model = model;
    }

    LecturesController.prototype.loadCalendar = function (selector) {
        var _this = this;
        return _this.model.getAllLectures().then(function (data) {
            _this.view.showCalendar(selector, data);

        })

    }
    LecturesController.prototype.loadMyCalendar = function (selector) {
        var _this = this;
        return _this.model.getMyLectures().then(function (data) {
            console.log(data);
            _this.view.showCalendar(selector, data);

        })

    }
    LecturesController.prototype.loadAdd = function (selector) {
        this.view.showAdd(selector);
    }
    LecturesController.prototype.loadEdit = function (selector, data) {
        this.view.showEdit(selector, data);
    }
    LecturesController.prototype.loadDelete = function (selector, data) {
        this.view.showDelete(selector, data);
    }


    LecturesController.prototype.deleteEvent = function (data) {
        return this.model.deleteLecture(data._id);
    }
    
    LecturesController.prototype.editEvent = function (data) {
      return this.model.editLecture(data._id,data);
    }


    LecturesController.prototype.add = function (data) {
        return this.model.addLecture(data);
    }
    return {
        load: function (view, model) {
            return new LecturesController(view, model);
        }
    }
})();