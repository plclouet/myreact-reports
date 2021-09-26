import React, { Component } from "react";
import { connect } from "react-redux";
import { updateModel } from "./actionsModel";
import {  Link, Redirect } from "react-router-dom";
import ModelsService from "./modelsService";
//import AddReportPart2 from "./addReportPart2";
import styles from "./editModel.module.css";

class EditModel extends Component {
  constructor(props) {
    super(props);
    this.onChangeModelTitre = this.onChangeModelTitre.bind(this);
    this.onChangeModelContent = this.onChangeModelContent.bind(this);
 
    this.saveModel = this.saveModel.bind(this);

    this.state = {
      currentModel: {
        modelTitre: "",
        modelContent: ""
        
      },
      redirect: false,
    };
  }

   componentDidMount() {
     this.getModel(window.location.pathname.replace("/edit-model/", ""));
 
  } 

  onChangeModelTitre(e) {
    const modelTitre = e.target.value;

    this.setState(function (prevState) {
      return {
        currentModel: {
          ...prevState.currentModel,
          modelTitre: modelTitre,
        },
      };
    });
  }

  onChangeModelContent(e) {
    const modelContent = e.target.value;

    this.setState(function (prevState) {
      return {
        currentModel: {
          ...prevState.currentModel,
          modelContent: modelContent,
        },
      };
    });
  }




  getModel(id) {
    ModelsService.get(id).then((response) => {
      this.setState({
        currentModel: response.data,
      });
    });
  }

  saveModel() {
    this.props
      .updateModel(this.state.currentModel.id, this.state.currentModel)
      .then(this.setState(() => ({
          redirect: true
        }))
      );
  }

  render() {
    const { redirect, currentModel } = this.state;
    //const str=currentReport.rdvDate;
    //const goodDate = str.slice(0, 16);

    

    console.log(currentModel);
  
    
    if (redirect) { 
     
      return <Redirect to="/list-models" />;
     
   
    }

    return (
      <div className={`container-xxl vh-100 ${styles.form_color}`}>
         <div className="row">
           
           <div className="col-lg-12 px-5">
    <h1 className={styles.label_color}>Modification du model</h1>
      <form>
        <div className="form-group">
            <label className={styles.label_color} htmlFor="modelTitre">Titre</label>
            <input
              type="text"
              className="form-control"
              id="modelTitre"
              required
              value={currentModel.modelTitre}
              onChange={this.onChangeModelTitre}
              name="modelTitre"
            />
          </div>

          <div className="form-group">
            <label className={styles.label_color} htmlFor="modelContent">Contenu</label>
            <textarea
              rows={15}
              cols={80}
              type="text"
              className="form-control"
              id="modelContent"
              required
              value={currentModel.modelContent}
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
          <button className="btn btn-light">liste des models</button>
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

export default connect(null, { updateModel })(EditModel);
