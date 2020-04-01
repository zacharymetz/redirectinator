
class ParseAPI {
  constructor() {
    this.parse = require('parse');
    //  this is the connected
    this.parse.initialize("backend");
    this.parse.serverURL = 'https://api.logicx.ca/'
    //  this is where we can inisialize some of ther services 

    //  add the authchage function 
    this.parse.onAuthChangeListeners = [];
    var _this =  this;
    this.parse.onAuthChange = function(listener){
      console.log("adding event listners")
      _this.parse.onAuthChangeListeners.push(listener);
    }
    this.parse.triggerOnAuthChange = function(){

      var user = _this.parse.User.current()
      _this.parse.onAuthChangeListeners.forEach((elm)=>{
        elm(user);
      })
    }

  }

  // down here is where we create function that will wrap around the parse api thing 
  async loguserin(email,password){

  }

  //  this function will call its own parse thing 
  //  and say it wants to remove its session 
  signOutCurrentUser = () =>
    this.parse.User.logOut
  
  //  this function should set what ever is passed to it 
  //  to only be read and written by the user that created it 
  
  setObjectToPrivate(object){
    object.setACL(new this.parse.ACL(this.parse.User.current()))
  }
  
  
}

export default ParseAPI;