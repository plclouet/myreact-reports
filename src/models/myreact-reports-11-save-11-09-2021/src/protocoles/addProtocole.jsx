import React, { Component } from "react";
import { connect } from "react-redux";
import { createProtocole } from "./actionsProtocole";
import { Redirect, Link } from "react-router-dom";

//import  ShowProtocoles  from "../protocoles/showProtocoles";
//import AddReportPart2 from "./addReportPart2";

import styles from "./addProtocole.module.css";


class AddProtocole extends Component {
  constructor(props) {
    super(props);
   
    this.onChangeProtocoleTitre = this.onChangeProtocoleTitre.bind(this);
    this.onChangeProtocoleContent = this.onChangeProtocoleContent.bind(this);
  
    this.saveProtocole = this.saveProtocole.bind(this);

    this.state = {
      protocoleTitre: "",
      protocoleContent: "",
   
      redirect: false,
    };
  }

  onChangeProtocoleTitre(e) {
    this.setState({
      protocoleTitre: e.target.value,
    });
  }

  onChangeProtocoleContent(e) {
    this.setState({
      protocoleContent: e.target.value,
    });
  }



  saveProtocole() {
    const { protocoleTitre, protocoleContent } = this.state;

    this.props.createProtocole(protocoleTitre, protocoleContent)
    .then(this.setState(() => ({
        redirect: true
      })));
  }

  render() {
    const { redirect } = this.state;
    //console.log(redirect);

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (

      <div className={`container py-5 ${styles.form_color}`}>
        <div className="row">
        

      {/* <div className={`container py-5 ${styles.form_color}`}> */}
         {/* <div className="row"> */}
          
    <h1>Nouveau protocole</h1>
      <form>
        
          <div className="form-group">
            <label htmlFor="protocoleTitre">Titre</label>
            <input
              type="text"
              className="form-control"
              id="protocoleTitre"
              required
              value={this.state.protocoleTitre}
              onChange={this.onChangeProtocoleTitre}
              name="protocoleTitre"
            />
          </div>


          <div className="form-group">
            <label htmlFor="protocoleContent">Contenu</label>
            <textarea
              // type="textarea"
              rows={10}
              cols={50}
              className="form-control"
              id="protocoleContent"
              required
              value={this.state.protocoleContent}
              onChange={this.onChangeProtocoleContent}
              name="protocoleContent"
            />
          </div>

        

          <div className="row justify-content-around py-3">
            <div className="col-4" align="center">
              
              <button onClick={this.saveProtocole} className="btn btn-light">
              Submit
              </button>
             </div>
             <div className="col-4" align="center">
            <Link to="/">
                <button className="btn btn-light">Accueil</button>
            </Link>
            </div>
          </div>
        
          
        </form>
      
      {/* </div> */}
    {/* </div> */}
    </div>
    {/* fin de la première moitiée */}
    
{/* fin de la deuxième moitiée */}
    </div>
   
    );
  }
}

export default connect(null, { createProtocole })(AddProtocole);
