/**
 * Created by msimion on 10/12/2015.
 */
function Persistence () {

    this.getData = function () {

        //console.log(JSON.parse(localStorage.getItem("todoData")));
        return JSON.parse(localStorage.getItem("todoData"));

    };

    this.updateData = function (data) {
        var dataStored = JSON.stringify(data);
        localStorage.setItem("todoData", dataStored);
    }
}