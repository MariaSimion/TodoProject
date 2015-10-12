/**
 * Created by msimion on 10/9/2015.
 */
var appTodo = {

    data: [],
    persistenceUnit: new Persistence(),

    getDataFromPersistence: function () {
        appTodo.persistenceUnit.getData();
    },

    persistData: function (data) {
        appTodo.persistenceUnit.updateData(data);
    },

    add: function (test) {

        var tempData = new todo(test);
        data.push(tempData);

        appTodo.persistData(data);
    },

    findTodos: function (param) {

        appTodo.getDataFromPersistence();
        var result = _.where(data, param);
        return result;

    },

    deleteItems: function (param) {

        appTodo.getDataFromPersistence();
        var result = _.reject(data, param);
        appTodo.persistData(data);
    },

    update: function (id, item) {

        appTodo.getDataFromPersistence();
        var resultTodo = _.findWhere(data, {id: id});
        _.extend(resultTodo, item);
        appTodo.persistData(data);
    }
}
