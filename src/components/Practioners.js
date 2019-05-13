import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './components.css'
import Modal from "react-responsive-modal";
import firebase from "firebase";
export default class Practioners extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Pract: [],
            searchVal: "",
            modelData: "",
            modal: false,
            isNotSerching: true,
            filtertd: [],
            LoginName:""
        };
        this.toggle = this.toggle.bind(this)
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.handleModel = this.handleModel.bind(this)
        this.messageIdGenerator = this.messageIdGenerator.bind(this)    
        this.handleSearch = this.handleSearch.bind(this)    
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
   
    messageIdGenerator() {
        // generates uuid.
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            let r = (Math.random() * 16) | 0,
                v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    componentDidMount() {
        var user = JSON.parse(localStorage.getItem('user'));
        let loginperson = user.Name
        let islogin = user.login
       
        if (islogin === 1){
            this.setState({
                LoginName: loginperson
              })
      this.fetchData()
        }
        else{
          alert("User Must Login First")
          this.props.history.push("/")
        }
    
    
    }
    fetchData() {
        this.setState({
            Pract: [],
            currentPage: 1,
            ItemPerPage: 5,
            Bucket: [],
            Orders: [],
            searchVal: "",
            RenderItems: [],
            isSerching: true
        })
        let arr = [];
        let firebaseRef = firebase.database().ref("practitioner");
        firebaseRef.once("value", snap => {
            snap.forEach(Key => {
                let dataRef = firebaseRef.child(Key.ref.key).key;

                let data = snap.child(dataRef).val();

                data.firebasekEY = dataRef
                data.id = this.messageIdGenerator()

                arr.push(data)
                this.setState({
                    Pract: arr
                },()=>{
                    console.log(this.state.Pract)
                });

            });
        });

    }
    handleDelete(key) {
        let firebaseRef = firebase.database().ref("practitioner").child(key)
        firebaseRef.remove().then(() => {
            this.fetchData()
        })

    }
    onOpenModal = (key) => {

        this.handleModel(key)
    };
    handleModel(key) {
        let result = this.state.Pract.filter(obj => {
            return (
                obj.id === key
            )
        })

        this.setState({
            modelData: result,
            open: true
        })

    }
    onCloseModal = () => {
        this.setState({ open: false });

    };
    handleSearch(e) {
        this.setState({ searchVal: e.target.value })
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
        const { open } = this.state
        let filteredOrders = this.state.Pract.filter(order => {
            return (
                order.first_name.indexOf(this.state.searchVal) !==
                -1
            );
        },
        )
        const bg = {
            overlay: {
              background: "#2C5364",            
            }
          };

        return (
            <div className="containor">
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
                                    
                                    <button onClick={this.handleLogout.bind(this)} className="dropdown-item" href="#">Logout</button>

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
                                <Link to="/Dashboard"><li className="list-group-item bg-light"><i className="fa fa-tachometer"></i> Dashboard</li></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Practitioners"><li className="list-group-item bg-light"><i className="fa fa-university"></i> Practioners</li></Link>
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
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header"> Practitioner Details</div>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="d-flex align-items-start E-fucn-con">
                                                <div className="p-2 E-fucn-con1">
                                                    <h1 style={{"fontFamily": "Times"}}> Total Practitioners {this.state.Pract.length}</h1>
                                                </div>


                                            </div>


                                            <div className="card-body">
                                                <form className="card">
                                                    <div className="input-group">
                                                    <input onChange={this.handleSearch.bind(this)}
                                                    value={this.state.searchVal}
                                                    name="searchVal"
                                                    className="form-control form-control-lg form-control-borderless"
                                                    type="search"
                                                    placeholder="Search by Practitioner's Name"
                                                  />
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-danger"><i className="fa fa-search"></i> </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <div style={{ "color": "black",  "backgroundColor": "white", "border": "1", "overflow": 'scroll',}} className="table-responsive">
                                                <table  className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>S.No</th>
                                                            <th>Name</th>
                                                            <th>Last Name</th>
                                                            <th>Contact Number</th>
                                                            <th>Email</th>
                                                            <th>status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                  {filteredOrders.map((item, index)=>{
                                                      return(
                                                        <tr  key={item.firebaseRef}>
                                                        <td>{index+1}</td>
                                                      
                                                        <td>{item.first_name}</td>
                                                        <td>{item.last_name}</td>
                                                        <td>{item.contact_number}</td>
                                                        <td>{item.email}</td>
                                                        <td>
                                                            <button style={{"margin":10}} className="btn btn-success" onClick={() => this.handleDelete(item.firebasekEY)} type="submit">Delete</button>
                                                            <button className="btn btn-success" onClick={() => this.onOpenModal(item.id)}  type="submit" data-toggle="modal" data-target="#myModal">View</button> 
                                                          </td>
                                                      </tr>
                                                      )
                                                  })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    
                </div>
                <div>
                <Modal open={open} onClose={this.onCloseModal} styles={bg} center>
      
                  <div style={{ "padding": "20" }} className="Model">
                    {this.state.modelData &&
                      <div>
                        <h2>Name :<i> {this.state.modelData[0].first_name} </i></h2>
                        <h2> 1<sup>st</sup> Post Code  : <i> {this.state.modelData[0].post_code_1} </i> </h2>
                        <h2> 2<sup>nd</sup> Post Code : <i> {this.state.modelData[0].post_code_3} </i></h2>
                        <h2> DBS expiry Date :<i> {this.state.modelData[0].dbs_expiry_date} </i></h2>
                        <h2> DBS Issue Date :<i> {this.state.modelData[0].dbs_issue_date} </i></h2>
                      </div>
                    }
      
      
                  </div>
      
      
      
      
                </Modal>
              </div>
                
            </div>
        )
    }
}
