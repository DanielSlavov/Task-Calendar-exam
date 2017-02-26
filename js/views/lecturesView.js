var app = app || {};

app.lecturesView = (function () {
    function showCalendar(selector, data) {
        $.get('templates/calendar.html', function (templ) {
            $(selector).html(templ);
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            location.href = '#/calendar/add/';
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        
                        $('#editLecture').on('click', function () {
                            var a = document.getElementsByClassName("modal-backdrop fade in");
                            var parent = a[0].parentNode;
                            $('body').css('overflow','scroll');
                            parent.removeChild(a[0]);
                            Sammy(function () {
                                this.trigger('edit', calEvent,data);
                            })
                        });
                        $('#deleteLecture').on('click', function () {
                            var a = document.getElementsByClassName("modal-backdrop fade in");
                            var parent = a[0].parentNode;
                            $('body').css('overflow','scroll');
                            parent.removeChild(a[0]);
                            Sammy(function () {
                                this.trigger('delete', calEvent);
                            })
                        })
                    });
                    $('#events-modal').modal();
                }
            });
        })
    }
    function showAdd(selector) {
        $.get('templates/add-lecture.html', function (templ) {
            $(selector).html(templ);
            $('#addLecture').click(function () {
                var title = $('#title').val();
                var start = $('#start').val();
                var end = $('#end').val();
                var lector = sessionStorage['username'];
                var data = { title: title, start: start, end: end, lector: lector };
                Sammy(function () {
                    this.trigger('add', data);
                });
            })
        })
    }
    function showEdit(selector, data) {
        $.get('templates/edit-lecture.html', function (templ) {
            var renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
            $('#editLecture').click(function () {
                Sammy(function () {
                    var title = $('#title').val();
                     var start = $('#start').val();
                     var end = $('#end').val();
                     data["title"] = title;
                     data["start"] = start;
                     data["end"] = end;
                    this.trigger('proccessEdit', data);
                });
            })
        });

    }
    function showDelete(selector, data) {
        location.href = '#';
        $.get('templates/delete-lecture.html', function (templ) {
            var renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
            $('#deleteLecture').click(function () {
                Sammy(function () {
                    this.trigger('proccessDelete', data);
                });
            })
        });
    }
    return {
        load: function () {
            return {
                showCalendar: showCalendar,
                showAdd: showAdd,
                showEdit: showEdit,
                showDelete: showDelete

            }
        }
    }
} ());