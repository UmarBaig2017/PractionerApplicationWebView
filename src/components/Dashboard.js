import React, { Component } from 'react';
import firebase from "firebase";
import './admin.css'
import { Link } from 'react-router-dom';
export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adminName:"",
      SubEmail: "",
      subPasswrd: "",
      Pract: [],
      Parnets: [],
      Orders: [],
      admins: [],
      LoginName: ""

    }
    this.fetchPractioners = this.fetchPractioners.bind(this)
    this.fetchParents = this.fetchParents.bind(this)
    this.fetchOrders = this.fetchOrders.bind(this)
    this.FetchAdmins = this.FetchAdmins.bind(this)
  }

  handleChnage(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleAdminSubmit(e) {
    e.preventDefault()
   
    const auth = firebase.auth();
    let promise = auth.createUserWithEmailAndPassword(this.state.SubEmail, this.state.subPasswrd);
    promise.then(() => {
      let email= this.state.SubEmail
      let em = email.replace('.com','')
      let db = firebase.database();
     
      db.ref("Admins").child(em)
      .set({"Admin":this.state.SubEmail , "password" : this.state.subPasswrd , "Name": this.state.adminName})
      .then(e => {
      
        this.setState({
          success: true
        });
      });

      alert("Admin Added Successfully")
      document.location.reload()

    })
    promise.catch(e => {

      alert("admin not created , Try again")
    })
  }
  componentDidMount(){

    var user = JSON.parse(localStorage.getItem('user'));
    let loginperson = user.Name
    let islogin = user.login
    
    if (islogin === 1){
      this.setState({
        LoginName: loginperson
      })
    this.fetchPractioners()
    this.fetchParents()
    this.fetchOrders()
    this.FetchAdmins()
    }
    else{
      alert("User Must Login First")
      this.props.history.push("/")
    }

  }
  fetchPractioners(){
    let arr = [];
        let firebaseRef = firebase.database().ref("practitioner");
        firebaseRef.once("value", snap => {
            snap.forEach(Key => {
                let dataRef = firebaseRef.child(Key.ref.key).key;

                let data = snap.child(dataRef).val();

            

                arr.push(data)
                this.setState({
                    Pract: arr
                },()=>{
                    
                });

            });
        });

  }
  fetchParents(){
    let arr = [];
        let firebaseRef = firebase.database().ref("parents");
        firebaseRef.once("value", snap => {
            snap.forEach(Key => {
                let dataRef = firebaseRef.child(Key.ref.key).key;

                let data = snap.child(dataRef).val();
                arr.push(data)
                this.setState({
                    Parnets: arr
                },()=>{
                    
                });

            });
        });

  }
  fetchOrders(){
    let arr = [];
        let firebaseRef = firebase.database().ref("bucket");
        firebaseRef.once("value", snap => {
            snap.forEach(Key => {
                let dataRef = firebaseRef.child(Key.ref.key).key;

                let data = snap.child(dataRef).val();

                arr.push(data)
                this.setState({
                  Orders: arr
                },()=>{
                    
                });

            });
        });

  }
  FetchAdmins(){
    let arr = [];
        let firebaseRef = firebase.database().ref("Admins");
        firebaseRef.once("value", snap => {
            snap.forEach(Key => {
                let dataRef = firebaseRef.child(Key.ref.key).key;

                let data = snap.child(dataRef).val();
             

                arr.push(data)
                this.setState({
                  admins: arr
                },()=>{
                    
                });

            });
        })
  }
  handleLogout(){
    let user={
      Name : "",
      login: 0
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.props.history.push("/")
  }
  render() {
    return (
      <div>
        {/* navigation */}
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
          <div className="container-fluid">
          <Link to="/Dashboard" className="navbar-brand" > Childcare Centeral</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle"  id="navbardrop" data-toggle="dropdown">
                  {this.state.LoginName}
        </a>
                  <div className="dropdown-menu">
                    
                    <button onClick={this.handleLogout.bind(this)} className="dropdown-item" >Logout</button>

                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <br />
        <div className="container-fluid row">
          <div className="col-md-3 ">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/Dashboard"> <li className="list-group-item bg-light"><i className="fa fa-tachometer"></i> Dashboard</li></Link>
              </li>
              <li className="nav-item">
                <Link to="/Practitioners"><li className="list-group-item bg-light"><i className="fa fa-university"></i> Practitioners
                </li></Link>
              </li>
              <li className="nav-item">
                <Link to="/Parents"><li className="list-group-item bg-light"><i className="fa fa-home"></i> Parents</li></Link>
              </li>
              <li className="nav-item">
                <Link to="/Orders"><li className="list-group-item bg-light"><i className="fa fa-shopping-basket"></i> Orders</li></Link>
              </li>
             
          

            </ul>  </div>
          <br />

          <div className="col-md-9">
            <div className="row">
              <div className="col-md-3">
                <div className="card">
                  <div className="card-header bg-warning">
                    <div className="row">
                      <div className="col-md-3">
                        <i className="fa fa-signal" aria-hidden="true" style={{ "fontSize": "4.5em", "color": "blue" }}></i>
                      </div>
                     
                      <div className="col-md-9" style={{ "color": "blue" }}>
                        <div className="text-right" style={{ "fontSize": "2.5em" }}>{this.state.Pract.length}</div>
                        <div className="text-right"> Practitioners </div>
                      </div>
                  
                    </div>
                  </div>
                  <div className="card-footer ">
                  <Link to="/Practitioners">
                      <div className="row">
                       <div className="col-md-10">View Practitioners</div> 
                        <div className="col-md-2"><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i> </div>
                      </div>
                      </Link> 
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-header bg-success">
                    <div className="row">
                      <div className="col-md-3">
                        <i className="fa fa-list" aria-hidden="true" style={{ "fontSize": "4.5em", "color": "white" }}></i>
                      </div>
                      <div className="col-md-9" style={{ "color": "white" }}>
                        <div className="text-right" style={{ "fontSize": "2.5em" }}>{this.state.Parnets.length}</div>
                        <div className="text-right">Parents</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer ">
                   <Link to="/Parents">
                      <div className="row">
                        <div className="col-md-10"> View Parents </div>
                        <div className="col-md-2"><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i> </div>
                      </div>
                      </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-header bg-primary">
                    <div className="row">
                      <div className="col-md-3">
                        <i className="fa fa-eye" aria-hidden="true" style={{ "fontSize": "4.5em", "color": "yellow" }}></i>
                      </div>
                      <div className="col-md-9" style={{ "color": "yellow" }}>
                        <div className="text-right" style={{ "fontSize": "2.5em" }}>{this.state.Orders.length}</div>
                        <div className="text-right">Orders</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer ">
                  <Link to= "/Orders">
                      <div className="row">
                        <div className="col-md-10">View Orders</div>
                        <div className="col-md-2"><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i> </div>
                      </div>
                      </Link>
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card">
                  <div className="card-header bg-info">
                    <div className="row">
                      <div className="col-md-3">
                        <i className="fa fa-users" aria-hidden="true" style={{ "fontSize": "4.5em", "color": "brown" }}></i>
                      </div>
                      <div className="col-md-9" style={{ "color": "brown" }}>
                        <div className="text-right" style={{ "fontSize": "2.5em" }}>{this.state.admins.length}</div>
                        <div className="text-right">Admins</div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer ">
                 <Link to="/Dashboard">
                      <div className="row">
                        <div className="col-md-10"> View Admins</div>
                        <div className="col-md-2"><i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i> </div>
                      </div>
                      </Link>
                   
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row" style={{ "marginTop": "30px" }}>
                <div className="col-md-7">
                  <div className="card">
                    <div className="card-header">
                      <h5>Sub Admins</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">

                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Name</th>
                              <th>Email</th>
                            </tr>
                          </thead>
                          <tbody>
                          {this.state.admins.length> 0 && this.state.admins.map((item, index)=>{
                            return(
                              <tr key={index}>
                              <td>{index+1}</td>
                              <td> {item.Name}</td>
                              <td>{item.Admin}</td>
                            </tr>
                            )
                          })}
                            

                          </tbody>
                        </table>

                      </div>
                    </div>

                  </div>
                </div>
                <div className="col-md-5">
                  <form className="card">
                    <div className="card-header text-center">
                      <h4>Registered Sub Admin</h4>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <div className="row">
                          <label className="control-label col-md-4">Name</label>
                          <div className="col-md-8">
                            <input type="text" name="adminName"

                              value={this.state.adminName} onChange={this.handleChnage.bind(this)} className="form-control" placeholder="Enter Name" />
                            <br />
                          </div>
                        </div>
                        <div className="row">
                          <label className="control-label col-md-4">Email</label>
                          <div className="col-md-8">
                            <input type="email" name="SubEmail"

                              value={this.state.SubEmail} onChange={this.handleChnage.bind(this)} className="form-control" placeholder="Enter Email" />
                            <br />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="row">

                          </div>
                          <div className="form-group">
                            <div className="row">
                              <label className="control-label col-md-4">Password</label>
                              <div className="col-md-8">
                                <input type="password" onChange={this.handleChnage.bind(this)}
                                  name="subPasswrd"
                                  value={this.state.subPasswrd} className="form-control" placeholder="Password" />
                              </div>
                            </div>
                          </div>

                        </div>


                        <div className="row">
                          <div className="col-md-12">
                            <button className="btn btn-danger btn-block " onClick={this.handleAdminSubmit.bind(this)}>Registered Admin</button>
                          </div>
                        </div>
                      </div>
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
