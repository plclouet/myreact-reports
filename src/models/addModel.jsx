import React, { Component } from "react";
import { connect } from "react-redux";
import { createModel } from "./actionsModel";
import { Redirect, Link } from "react-router-dom";

//import  ShowProtocoles  from "../protocoles/showProtocoles";
//import AddReportPart2 from "./addReportPart2";

import styles from "./addModel.module.css";


class AddModel extends Component {
  constructor(props) {
    super(props);
   
    this.onChangeModelTitre = this.onChangeModelTitre.bind(this);
    this.onChangeModelContent = this.onChangeModelContent.bind(this);
  
    this.saveModel = this.saveModel.bind(this);

    this.state = {
      modelTitre: "",
      modelContent: "",
   
      redirect: false,
    };
  }

  onChangeModelTitre(e) {
    this.setState({
      modelTitre: e.target.value,
    });
  }

  onChangeModelContent(e) {
    this.setState({
      modelContent: e.target.value,
    });
  }



  saveModel() {
    const { modelTitre, modelContent } = this.state;

    this.props.createModel(modelTitre, modelContent)
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
          
    <h1>Nouveau model</h1>
      <form>
        
          <div className="form-group">
            <label htmlFor="modelTitre">Titre</label>
            <input
              type="text"
              className="form-control"
              id="modelTitre"
              required
              value={this.state.modelTitre}
              onChange={this.onChangeModelTitre}
              name="modelTitre"
            />
          </div>


          <div className="form-group">
            <label htmlFor="modelContent">Contenu</label>
            <textarea
              // type="textarea"
              rows={10}
              cols={50}
              className="form-control"
              id="modelContent"
              required
              value={this.state.modelContent}
              onChange={this.onChangeModelContent}
              name="modelContent"
            />
          </div>

        

          <div className="row justify-content-around py-3">
            <div className="col-4" align="center">
              
              <button type="button" onClick={this.saveModel} className="btn btn-light">
              Submit
              </button>
             </div>
             <div className="col-4" align="center">
             <Link to="/list-models">
              <button className="btn btn-light m-2">list models</button>
            </Link>
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

export default connect(null, { createModel })(AddModel);
