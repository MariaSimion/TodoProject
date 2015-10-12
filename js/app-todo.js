/**
 * Created by msimion on 10/9/2015.
 */
var appTodo = {

    data: [],

    add: function (test) {

        var tempData = new todo(test);
        data.push(tempData);

        persistence.updateData(data);

    },

    getTodo: function (param) {

        persistence.getData();
        var result = _.where(data, param);
        return result;

    },

    deleteItems: function (param) {

        persistence.getData();
        var result = _.reject(data, param);
        persistence.updateData(result);
    },

    update: function (id, item) {

        persistence.getData();
        var resultTodo = _.findWhere(data, {id: id});
        _.extend(resultTodo, item);
        persistence.updateData(data);

    }
}
