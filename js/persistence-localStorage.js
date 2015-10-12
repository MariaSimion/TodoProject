/**
 * Created by msimion on 10/12/2015.
 */
function Persistence() {

    this.getData = function () {

        return data = JSON.parse(localStorage.getItem("todoData"));

    };

    this.updateData = function(data) {
        var dataStored = JSON.stringify(data);
        localStorage.setItem("todoData", dataStored);
    }
}