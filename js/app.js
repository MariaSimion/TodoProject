var app = {

    ENTER_KEY_CODE: 13,
    BACKSPACE_KEY_CODE: 8,

    readData: function () {
        appTodo.getDataFromPersistence();
        $.each(appTodo.data, function (index, params) {
            if (appTodo.data[index] != null) {
                app.generateElement(appTodo.data[index]);
                console.log(appTodo.data[index]);
                app.checkedInput(index, params);
            }
        });
    },

    initialize: function () {

        this.addEvents();
        this.readData();
        this.updateTodo();
        $(".all").on("click", function () {
            app.allClick();
        });
        $(".active").on("click", function () {
            app.activeClick();
        });
        $(".completed").on("click", function () {
            app.completedClick();
        });
        $(".clear-completed").on("click", function () {
            app.deleteCompleted();
        });

    },

    checkedInput: function (index, params) {
        if (appTodo.data[index].completed == true) {
            $("#" + params.id).prop('checked', true);
        }
    },

    generateElement: function (params) {

        var input = $(document.createElement('input'));
        input.prop('type', 'checkbox');
        input.prop('class', 'col-lg-1');
        input.prop('id', params.id);

        var label = $(document.createElement('label'));
        label.text(params.name);

        var div = $(document.createElement('div'));
        div.prop('class', 'line');

        var li = $(document.createElement('li'));

        input.appendTo(div);
        label.appendTo(div);
        div.appendTo(li);
        li.appendTo("#todo-list");

        if (appTodo.data.length > 0) {
            $("#todo-count").text(appTodo.data.length);
            $("#footer").show();
        }

    },

    addEvents: function () {

        $("#footer").hide();

        var post = new todo($("#new-todo").val());

        $(document).keypress(function (event) {

            if (event.which == app.ENTER_KEY_CODE) {

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
                    if (event.which != app.BACKSPACE_KEY_CODE && event.which != app.ENTER_KEY_CODE) {
                        return false;
                    }
                });
            } else if (charactersLeft == 20) {
                $("#new-todo").unbind();
            }
        });
    },

    addTodo: function () {

        var name = $("#new-todo").val();
        var tempData = new todo(name);
        appTodo.add(name);

        //generate Todo item
        app.generateElement(tempData);
        app.updateTodo();
    },

    allClick: function () {
        $("#todo-list").empty();
        $.each(appTodo.data, function (index, params) {
            app.generateElement(params);
            app.checkedInput(index, params);
        });
    },

    activeClick: function () {
        $("#todo-list").empty();
        $.each(appTodo.data, function (index, params) {
            if (params.completed == false) {
                app.generateElement(params);
            }
        });
    },

    completedClick: function () {
        $("#todo-list").empty();
        $.each(appTodo.data, function (index, params) {
            if (params.completed == true) {
                app.generateElement(params);
                app.checkedInput(index, params);
            }
        });
    },

    deleteCompleted: function () {
        appTodo.deleteItems({completed: true});
        $("#todo-list").empty();
        this.readData();
        app.updateTodo();
    },

    updateTodo: function () {

        $.each(appTodo.data, function (index, params) {
            $("#" + params.id).change(function () {
                if ($('#' + params.id).is(':checked')) {
                    appTodo.update(params.id, {completed: true});
                } else {
                    appTodo.update(params.id, {completed: false});
                }
            })
        });
    }
}
