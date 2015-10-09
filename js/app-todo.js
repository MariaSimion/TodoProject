/**
 * Created by msimion on 10/9/2015.
 */
var appTodo = {

    data: [],

    add: function (test) {

        var tempData = new todo(test);
        data.push(tempData);

        var dataStored = JSON.stringify(data);
        localStorage.setItem("todoData", dataStored);

    },

    getTodoWhoIsntCompleted: function () {
        var resultData = [];
        data = JSON.parse(localStorage.getItem("todoData"));
        for (var i = 0; i < data.length; i++) {
            if (data[i].completed == false) {
                resultData.push(data[i]);
            }
        }
        return resultData;
    },

    getTodoWhoIsCompleted: function () {
        var resultData = [];
        data = JSON.parse(localStorage.getItem("todoData"));
        for (var i = 0; i < data.length; i++) {
            if (data[i].completed == true) {
                resultData.push(data[i]);
            }
        }
        return resultData;
    },

    deleteItems: function () {

        var result = appTodo.getTodoWhoIsntCompleted();
        var dataStored = JSON.stringify(result);
        localStorage.setItem("todoData", dataStored);

    },

    update: function (items, state) {
        data = JSON.parse(localStorage.getItem("todoData"));
        for (var i = 0; i < data.length; i++) {
            if (_.isEqual(data[i], items)) {
                if (data[i].completed != state) {
                    if (state == false) {
                        data[i].completed = false;
                        var dataStored = JSON.stringify(data);
                        localStorage.setItem("todoData", dataStored);
                    } else {
                        data[i].completed = true;
                        var dataStored = JSON.stringify(data);
                        localStorage.setItem("todoData", dataStored);
                    }
                }
            }
        }
    }
}
