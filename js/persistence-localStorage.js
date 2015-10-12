/**
 * Created by msimion on 10/12/2015.
 */
var persistence = {

    getData: function (data) {

        return data = JSON.parse(localStorage.getItem("todoData"));

    },

    updateData: function (data) {
        var dataStored = JSON.stringify(data);
        localStorage.setItem("todoData", dataStored);
    }
}