/**
 * Created by msimion on 10/9/2015.
 */
var appTodo = {

    data: [],
    persistenceUnit: new Persistence(),

    getDataFromPersistence: function () {
        if (this.data == null) {
            this.data = [];
        } else {
            this.data = appTodo.persistenceUnit.getData();
        }
        console.log(this.data);
    },

    persistData: function (data) {
        appTodo.persistenceUnit.updateData(data);
    },

    add: function (param) {

        var tempData = new todo(param);
        console.log(tempData);
        console.log(this.data);
        this.data.push(tempData);

        appTodo.persistData(this.data);
    },

    findTodos: function (param) {

        var result = _.where(this.data, param);
        return result;

    },

    deleteItems: function (param) {

        var result = _.reject(this.data, param);
        appTodo.persistData(result);
    },

    update: function (id, item) {

        var resultTodo = _.findWhere(this.data, {id: id});
        console.log(resultTodo);
        var result = _.extend(resultTodo, item);
        console.log(this.data);
        appTodo.persistData(this.data);
    }
}
