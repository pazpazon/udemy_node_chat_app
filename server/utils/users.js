
class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    let user = { id, name, room };
    this.users.push(user);
    return user;
  }
  removeUser (id){
    let removed = this.getUser(id);
    if (removed) this.users = this.users.filter( (user) => user.id !== id);
    return removed;
  }
  getUser (id){
    return this.users.filter( (user) => user.id === id)[0];
  }
  getUserList(room){
    let users = this.users.filter((user) => user.room === room);
    let namesArray = users.map( (user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};