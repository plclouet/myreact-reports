import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProtocole } from "./actionsProtocole";
import {  Link, Redirect } from "react-router-dom";
import ProtocolesService from "./protocolesService";
//import AddReportPart2 from "./addReportPart2";
import styles from "./editProtocole.module.css";

class EditProtocole extends Component {
  constructor(props) {
    super(props);
    this.onChangeProtocoleTitre = this.onChangeProtocoleTitre.bind(this);
    this.onChangeProtocoleContent = this.onChangeProtocoleContent.bind(this);
 
    this.saveProtocole = this.saveProtocole.bind(this);

    this.state = {
      currentProtocole: {
        protocoleTitre: "",
        protocoleContent: ""
        
      },
      redirect: false,
    };
  }

   componentDidMount() {
     this.getProtocole(window.location.pathname.replace("/edit-protocole/", ""));
 
  } 

  onChangeProtocoleTitre(e) {
    const protocoleTitre = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProtocole: {
          ...prevState.currentProtocole,
          protocoleTitre: protocoleTitre,
        },
      };
    });
  }

  onChangeProtocoleContent(e) {
    const protocoleContent = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProtocole: {
          ...prevState.currentProtocole,
          protocoleContent: protocoleContent,
        },
      };
    });
  }




  getProtocole(id) {
    ProtocolesService.get(id).then((response) => {
      this.setState({
        currentProtocole: response.data,
      });
    });
  }

  saveProtocole() {
    this.props
      .updateProtocole(this.state.currentProtocole.id, this.state.currentProtocole)
      .then(this.setState(() => ({
          redirect: true
        }))
      );
  }

  render() {
    const { redirect, currentProtocole } = this.state;
    //const str=currentReport.rdvDate;
    //const goodDate = str.slice(0, 16);

    

    console.log(currentProtocole);
  
    
    if (redirect) { 
     
      return <Redirect to="/list-protocoles" />;
     
   
    }

    return (
      <div className={`container-xxl ${styles.form_color}`}>
         <div className="row">
           
           <div className="col-lg-12 px-5 vh-100">
    <h1 className={styles.label_color}>Modification du protocole</h1>
      <form>
        <div className="form-group">
            <label className={styles.label_color} htmlFor="protocoleTitre">Titre</label>
            <input
              type="text"
              className="form-control"
              id="protocoleTitre"
              required
              value={currentProtocole.protocoleTitre}
              onChange={this.onChangeProtocoleTitre}
              name="protocoleTitre"
            />
          </div>

          <div className="form-group">
            <label className={styles.label_color} htmlFor="protocoleContent">Contenu</label>
            <textarea
              rows={5}
              cols={80}
              type="text"
              className="form-control"
              id="protocoleContent"
              required
              value={currentProtocole.protocoleContent}
              onChange={this.onChangeProtocoleContent}
              name="protocoleContent"
            />
          </div>

        

          

          

         

         

          
          <div className="row justify-content-around py-3">
            <div className="col-4" align="center">
          <button type="button" onClick={this.saveProtocole} className="btn btn-light">
            Submit
          </button>
          </div>
          <div className="col-4" align="center">
          <Link to="/list-protocoles">
          <button className="btn btn-light">liste des protocoles</button>
          </Link>
          </div>
          </div>
          </form>
      </div>
       {/* fin de la première moitiée */}
   {/*  <div className="col-lg-4">
      <AddReportPart2 />
    </div> */}
{/* fin de la deuxième moitiée */}
      </div>
    </div>
    );
  }
}

export default connect(null, { updateProtocole })(EditProtocole);
