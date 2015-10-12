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

    getTodo: function (param) {

        data = JSON.parse(localStorage.getItem("todoData"));
        var result = _.where(data, param);
        return result;

    },

    deleteItems: function (param) {

        data = JSON.parse(localStorage.getItem("todoData"));
        var result = _.reject(data, param);
        console.log(result);
        var dataStored = JSON.stringify(result);
        localStorage.setItem("todoData", dataStored);

    },

    update: function (id, item) {

        data = JSON.parse(localStorage.getItem("todoData"));
        var resultTodo = _.findWhere(data, {id: id});
        _.extend(resultTodo, item);
        var dataStored = JSON.stringify(data);
        localStorage.setItem("todoData", dataStored);

    }
}
