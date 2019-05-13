import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import firebase from "firebase";
import Modal from "react-responsive-modal";
export default class Orders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Orders: [],
            currentPage: 1,
            todosPerPage: 5,
            Bucket: [],
           searchVal: "",
            modelData: "",
            LoginName: ""


        };
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.handleModel = this.handleModel.bind(this)
        this.messageIdGenerator = this.messageIdGenerator.bind(this)
        this.toggle = this.toggle.bind(this)

    }
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }
      handleSearch(e) {
        this.setState({ searchVal: e.target.value })
      }
      toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
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
          Orders: [],
          currentPage: 1,
          todosPerPage: 5,
          Bucket: [],
          searchVal: ""
        })
        let arr = [];
        let firebaseRef = firebase.database().ref("bucket");
        firebaseRef.once("value", snap => {
          snap.forEach(Key => {
            let dataRef = firebaseRef.child(Key.ref.key).key;
    
            let data = snap.child(dataRef).val();
    
            data.firebasekEY = dataRef
            data.id = this.messageIdGenerator()
            arr.push(data)
            this.setState({
              Orders: arr
            });
          
          });
        });
    
      }
      handleDelete(key) {
        let firebaseRef = firebase.database().ref("bucket").child(key)
        firebaseRef.remove().then(() => {
          this.fetchData()
        })
    
      }
      onOpenModal = (key) => {
    
        this.handleModel(key)
      };
      handleModel(key) {
        let result = this.state.Orders.filter(obj => {
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
      handleAssending() {
        let list = this.state.Orders;
        let newlist = list.sort((a, b) => b.price - a.price);
        this.setState({
          Orders: newlist
        });
      }
      handleDeceding() {
        let list = this.state.Orders;
        let newlist = list.sort((a, b) => a.price - b.price);
        this.setState({
          Orders: newlist
        });
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
       
    let filteredOrders = this.state.Orders.filter(order => {
        return (
          order.price.indexOf(this.state.searchVal) !==
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
                                    <a className="nav-link dropdown-toggle" id="navbardrop" data-toggle="dropdown">
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
                <div class="container-fluid row">
                    <div className="col-md-3 ">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/Dashboard"><li className="list-group-item bg-light"><i className="fa fa-tachometer"></i> Dashboard</li></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Practitioners"><li className="list-group-item bg-light"><i className="fa fa-university"></i> Practitioners</li></Link>
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
                                    <div className="card-header">Orders Details</div>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="d-flex align-items-start E-fucn-con">
                                                <div className="p-6 E-fucn-con1">
                                                  <h1 style={{"fontFamily": "Times"}}>Total Orders {this.state.Orders.length}</h1>
                                                   
                                                </div>

                                                <div className="p-2 drop">
                                                    <div className="btn-group" className="drop-btn">
                                                        <button type="button" class="btn btn-danger">Select Filters</button>
                                                        <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <span className="sr-only">Toggle Dropdown</span>
                                                        </button>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item">  </a>

                                                            <div className="dropdown-divider"></div>
                                                            <button onClick={this.handleAssending.bind(this)} className="dropdown-item" >by High Price to Low</button>
                                                            <button onClick={this.handleDeceding.bind(this)} className="dropdown-item" >By Low Price to high</button>
                                                        </div>
                                                    </div>
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
                                                            placeholder="Search by Order Price"
                                                        />
                                                        <div class="input-group-btn">
                                                            <button class="btn btn-danger"><i class="fa fa-search"></i> </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <div style={{ "color": "black", "backgroundColor": "white", "border": "1", "overflow": 'scroll', }} class="table-responsive">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>S.No</th>
                                                            <th>Checkout Flag</th>
                                                            <th>Checkout Time</th>
                                                            <th>Price</th>
                                                           <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                        {filteredOrders.map((item, index) => {
                                                            return (
                                                                <tr key={item.firebaseRef}>
                                                                    <td>{index + 1}</td>

                                                                    <td>{item.checkout}</td>
                                                                    <td>{item.checkout_time}</td>
                                                    
                                                                    <td>{item.price}</td>
                                                                  
                                                                    <td>
                                                                        <button style={{ "margin": 10 }} className="btn btn-success" onClick={() => this.handleDelete(item.firebasekEY)} type="submit">Delete</button>
                                                                        <button className="btn btn-success" onClick={() => this.onOpenModal(item.id)} type="submit" data-toggle="modal" data-target="#myModal">View</button>
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

                <div className="Model">
                  {this.state.modelData &&
                    <div>
                      <h2 style={{ "fontFamily": "Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>Practitioner Email :<i> {this.state.modelData[0].practitioneremail} </i></h2>
                      <h2 style={{ "fontFamily": "Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}> Buyer Email : <i> {this.state.modelData[0].buyer} </i></h2>
                      <h2 style={{ "fontFamily": "Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}> Price :<i> {this.state.modelData[0].price} </i></h2>
    
    
                    </div>
                  }
    
    
                </div>
    
    
    
    
              </Modal>
                </div>

            </div>
        )
    }
}
