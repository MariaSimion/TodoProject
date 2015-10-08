var app = {

    var: data = []

    , readData: function () {
        data = JSON.parse(localStorage.getItem("todoData"));
        $.each(data, function (index, params) {
            if (data[index] != null) {
                app.generateElement(params);
                app.checkedInput(index, params);
            }
        });
    }

    , initialize: function () {

        this.addEvents();
        this.readData();
        this.updateTodo();
    }

    , checkedInput: function (index, params) {
        if (data[index].completed == true) {
            $("#" + params.id).prop('checked', true);
        }
    }
    , generateElement: function (params) {

        var input = $(document.createElement('input'));
        input.prop('type', 'checkbox');
        input.prop('class', 'col-lg-1');
        input.prop('id', params.id);

        var label = $(document.createElement('label'));
        label.text(params.name);

        var div = $(document.createElement('div'));
        div.prop('class', 'line');
        // div.prop('id', params.id);

        var li = $(document.createElement('li'));

        input.appendTo(div);
        label.appendTo(div);
        div.appendTo(li);
        li.appendTo("#todo-list");

        if (data.length > 0) {
            $("#todo-count").text(data.length);
            $("#footer").show();
        }

    }

    , addEvents: function () {

        $("#footer").hide();

        var post = new todo($("#new-todo").val());

        $(document).keypress(function (event) {

            if (event.which === 13) {

                if ($("#new-todo").val().length == 0) {
                    $.alert({
                        icon: 'glyphicon glyphicon-warning-sign',
                        theme: 'white',
                        title: 'Warning',
                        content: 'You must write something!'
                    });
                } else {

                    app.addTodo();

                    $("#new-todo").val("");
                    $(".counter").text('20');
                }
            }

        });

        $(document).keyup(function () {
            var postLength = $("#new-todo").val().length;
            var charactersLeft = 20 - postLength;
            $('.counter').text(charactersLeft);

            if (charactersLeft == 0) {
                $("#new-todo").keydown(function (event) {
                    if (event.which != 8) {
                        if (event.which != 13) {
                            return false;
                        }
                    }
                });
            } else if (charactersLeft == 20) {
                $("#new-todo").unbind();
            }
        });
    }

    , addTodo: function () {

        var name = $("#new-todo").val();
        var tempData = new todo(name);

        //saving element in local storage
        data.push(tempData);

        var dataStored = JSON.stringify(data);
        localStorage.setItem("todoData", dataStored);

        //generate Todo item
        app.generateElement(tempData);

    }
    , allClick: function () {
        $("#todo-list").empty();
        $.each(data, function (index, params) {
            app.generateElement(params);
            app.checkedInput(index, params);
        });
    }

    , activeClick: function () {
        $("#todo-list").empty();
        $.each(data, function (index, params) {
            if (params.completed == false) {
                app.generateElement(params);
            }
        });
    }

    , completedClick: function () {
        $("#todo-list").empty();
        $.each(data, function (index, params) {
            if (params.completed == true) {
                app.generateElement(params);
                app.checkedInput(index, params);
            }
        });
    }

    , deleteCompleted: function () {
        var result = [];
        $.each(data, function (index, params) {
            console.log(data[index].completed);
            if (data[index].completed == false) {
                result.push(data[index]);
            }
        });
        var dataStored = JSON.stringify(result);
        localStorage.setItem("todoData", dataStored);
        $("#todo-list").empty();
        this.readData();
    }

    , updateTodo: function () {

        $.each(data, function (index, params) {

            $("#" + params.id).change(function () {

                if ($('#' + params.id).is(':checked')) {
                    $("#clear-completed").show();
                    data[index].completed = true;
                    var dataStored = JSON.stringify(data);
                    localStorage.setItem("todoData", dataStored);
                } else {
                    data[index].completed = false;
                    var dataStored = JSON.stringify(data);
                    localStorage.setItem("todoData", dataStored);
                }
            })
        });
    }
}
