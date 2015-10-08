function todo(name) {

    this.id = new Date().getTime();

    this.name = name;
    this.completed = false;

}