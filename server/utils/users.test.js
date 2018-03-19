const expect = require('expect');

const {
  Users
} = require('./users');

describe('Users class', () => {
  let users;
  beforeEach(() => {
    users = new Users;
    users.users = [{
      id: 1,
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: 2,
      name: 'Yosl',
      room: 'React Course'
    }, {
      id: 3,
      name: 'Anat',
      room: 'Node Course'
    }]
  });

  it('should add new user', () => {
    let users = new Users();
    let user = users.addUser('@#$SDFDFe45', 'avram', 'ROOM');
    expect(users.users[0]).toMatchObject(user);
  });

  it('should remove a user', () => {
    let removed = users.removeUser(3);
    expect(removed).toMatchObject({id:3, name:'Anat', room:'Node Course'});
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    let removed = users.removeUser(99);
    expect(removed).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    let user = users.getUser(1);
    expect(user).toMatchObject({id:1, name:'Mike', room:'Node Course'});
  });

  it('should not find user', () => {
    let user = users.getUser(99);
    expect(user).toBeFalsy();
  });

  it('should return names for Node Course', () => {
    let userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Anat']);
  });

  it('should return name for React Course', () => {
    let userList = users.getUserList('React Course');
    expect(userList).toEqual(['Yosl']);
  });

});