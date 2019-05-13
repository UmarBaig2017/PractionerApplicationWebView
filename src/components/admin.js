import React, { Component } from 'react'
import "./admin.css";
import firebase from "firebase";
export default class Admin extends Component {
constructor(props){
  super(props)
  this.state = {
    Email: "",
    pw: "",  
  };
  this.handleChange = this.handleChange.bind(this);
  this.handleLogin = this.handleLogin.bind(this)
}

handleChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  });

}
handleLogin(e) {
  e.preventDefault()
  let emal = this.state.Email
  firebase.auth().signInWithEmailAndPassword(this.state.Email, this.state.pw).then(() => {
   let user={
     Name : emal,
     login: 1
   }
    localStorage.setItem('user', JSON.stringify(user));
   
    this.props.history.push("/Dashboard")
  }).catch(err => {
   alert(err)
  })

}
  render() {
    return (
      <div className="loginform">
         <div id="login">
      
        <div className="container">
            <div  id="login-row" className="row justify-content-center align-items-center">
                <div id="login-column" className="col-md-6">
                    <div  style={{"borderRadius": 25}} id="login-box" className="col-md-12">
                        <form id="login-form" className="form" action="" method="post">
                            <h3 className="text-center text-info">Admin Login</h3>
                            <div className="form-group">
                                <label  className="text-info">Email:</label><br/>
                                <input type="email" value={this.state.Email}
                                onChange={this.handleChange}
                                name="Email"
            
                                autoFocus={true} id="username" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-info">Password:</label><br/>
                                <input type="password" value={this.state.pw}
                                onChange={this.handleChange}
                                name="pw" id="password" className="form-control"/>
                            </div>
                            <div className="form-group">
                               
                                <input type="submit"  onClick={this.handleLogin} name="submit" className="btn btn-info btn-md" value="submit"/>
                            </div>
                           
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </div>
    )
  }
}