import React, { Component } from "react";
import { connect } from "react-redux";
import { createReport } from "./actions";
import { filterProtocoles } from "../protocoles/actionsProtocole";
import { filterModels } from "../models/actionsModel";
import { Redirect, Link } from "react-router-dom";

//import  ShowProtocoles  from "../protocoles/showProtocoles";
import AddReportPart2 from "./addReportPart2";

import styles from "./addReport.module.css";


class AddReport extends Component {
  constructor(props) {
    super(props);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeTitre = this.onChangeTitre.bind(this);
    this.onChangeExamen = this.onChangeExamen.bind(this);
    this.onChangeRdvDate = this.onChangeRdvDate.bind(this);
    this.onChangeIndication = this.onChangeIndication.bind(this);
    this.onChangeProtocole = this.onChangeProtocole.bind(this);
    this.onChangeContenu = this.onChangeContenu.bind(this);
    this.onChangeIncomplet = this.onChangeIncomplet.bind(this);
    this.saveReport = this.saveReport.bind(this);
    this.apiTitre = this.apiTitre.bind(this);

    this.state = {
      nom: "",
      prenom: "",
      titre: "",
      examen: "",
      rdvDate: "",
      indication: "",
      protocole: "",
      contenu:"",
      incomplet: false,
      redirect: false,
      autoSelectProtocoles: [],
      autoSelectModels: [],
   
    };
  }

  onChangeNom(e) {
    this.setState({
      nom: e.target.value,
    });
  }

  onChangePrenom(e) {
    this.setState({
      prenom: e.target.value,
    });
  }

  onChangeTitre(e) {
    this.setState({
      titre: e.target.value,
    }, () => this.apiTitre());
   
  }

  apiTitre() {
    const queryTitre = this.state.titre.slice(4,7);
    console.log("titre", this.state.titre);
    console.log("queryTitre",queryTitre);
    console.log("longueur",queryTitre.length);
    
    const queryP = `?protocoleTitre_contains=${queryTitre}`;
    (queryTitre && this.props.filterProtocoles(queryP).then((res) => {
      this.setState({
        autoSelectProtocoles:res
      })
    }))
    const queryM = `?modelTitre_contains=${queryTitre}`;
    (queryTitre && this.props.filterModels(queryM).then((res) => {
      this.setState({
        autoSelectModels:res
      })
    }))
    console.log(this.state.autoSelectProtocoles)
    console.log(this.state.autoSelectModels) 
  }

  onChangeExamen(e) {
    this.setState({
      examen: e.target.value,
    })
    
  }

  onChangeRdvDate(e) {
    this.setState({
      rdvDate: e.target.value,
    });
  }

  onChangeIndication(e) {
    this.setState({
      indication: e.target.value,
    });
  }

  onChangeProtocole(e) {
    this.setState({
      protocole: e.target.value,
    });
  }

  onChangeContenu(e) {
    this.setState({
      contenu: e.target.value,
    });
  }

  onChangeIncomplet() {
    //const incomplet = e.target.value;

    this.setState({
      incomplet: !this.state.incomplet,
    });
  }

 

  saveReport() {
    const { nom, prenom, titre, examen, rdvDate, indication, protocole, contenu, incomplet } = this.state;

    this.props.createReport(nom, prenom, titre, examen, rdvDate, indication, protocole, contenu, incomplet)
   /*  .then(() => {
      document.getElementById("incomplet").checked = false;
    }) */
    .then(this.setState({
        // redirect: true
        nom: "",
        prenom: "",
        titre: "",
        indication: "",
        protocole: "",
        contenu:"",
        incomplet: false,
        
      }, () => {
        document.getElementById("incomplet").checked = false;
      }));
  }

  render() {
    const { redirect, autoSelectProtocoles, autoSelectModels, titre } = this.state;
    console.log("titre render",titre);
  
  
    

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (

      <div className={`container py-5 ${styles.form_color}`}>
        <div className="row">
          <div className="col-lg-8">

    
          
    <h1>Nouveau patient</h1>
      <form>
        
          <div className="form-group">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              className="form-control"
              id="nom"
              required
              value={this.state.nom}
              onChange={this.onChangeNom}
              name="nom"
            />
          </div>

          <div className="form-group">
            <label htmlFor="prenom">Prenom</label>
            <input
              type="text"
              className="form-control"
              id="prenom"
              required
              value={this.state.prenom}
              onChange={this.onChangePrenom}
              name="prenom"
            />
          </div>

          <div className="form-group">
            <label htmlFor="titre">Titre</label>
            <input
              type="text"
              className="form-control"
              id="titre"
              required
              value={this.state.titre}
              onChange={this.onChangeTitre}
              name="titre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="examen">Examen</label>
            <select
              className="form-control"
              id="examen"
              required
              value={this.state.examen}
              onChange={this.onChangeExamen}
              name="examen"
            >
            <option>Choisir une option</option>
            <option value="IRMosteo">IRMosteo</option>
            <option value="IRMgene">IRMgene</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="rdvDate">Date de rendez-vous</label>
            <input
              type="datetime-local"
              className="form-control"
              id="rdvDate"
              required
              value={this.state.rdvDate}
              onChange={this.onChangeRdvDate}
              name="rdvDate"
            />
          </div>

          <div className="form-group">
            <label htmlFor="indication">Indication</label>
            <textarea
              // type="textarea"
              rows={2}
              cols={50}
              className="form-control"
              id="indication"
              required
              value={this.state.indication}
              onChange={this.onChangeIndication}
              name="indication"
            />
          </div>

          <div className="form-group">
            <label htmlFor="protocole">Protocole</label>
            <textarea
              rows={2}
              cols={50}
              className="form-control"
              id="protocole"
              required
              value={this.state.protocole}
              onChange={this.onChangeProtocole}
              name="protocole"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contenu">Contenu</label>
            <textarea
              rows={10}
              cols={50}
              className="form-control"
              id="contenu"
              required
              value={this.state.contenu}
              onChange={this.onChangeContenu}
              name="contenu"
            />
          </div>
          <div className="form-group">
            <label className={styles.label_color}>
                <input
                  type="checkbox"
                  id="incomplet"
                  defaultChecked={this.state.incomplet}
                  onChange={this.onChangeIncomplet}
                  name="incomplet"
                />
             Incomplet
             </label>
          </div>  
          <div className="row justify-content-around py-3">
            <div className="col-6" align="center">
              
              <button type="button" onClick={this.saveReport} className="btn btn-light">
              Submit
              </button>
             </div>
             <div className="col-6" align="center">
            <Link to="/">
                <button className="btn btn-light">Accueil</button>
            </Link>
            </div>
          </div>
        
          
        </form>
      
    {/*   </div>
    </div> */}
    </div>
    {/* fin de la première moitiée */}
    <div className="col-lg-4">
      <AddReportPart2 autoSelectProtocoles={autoSelectProtocoles} autoSelectModels={autoSelectModels}/>
    </div>
{/* fin de la deuxième moitiée */}
    </div>
    </div>
    );
  }
}

export default connect(null, { createReport, filterProtocoles, filterModels })(AddReport);
