import React, { Component } from "react";
import { connect } from "react-redux";
import { updateReport } from "./actions";
import { Redirect, Link } from "react-router-dom";
import ReportsService from "./reportsService";
import AddReportPart2 from "./addReportPart2";
import { filterProtocoles } from "../protocoles/actionsProtocole";
import { filterModels } from "../models/actionsModel";

import styles from "./editReport.module.css";

class EditReport extends Component {
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
      currentReport: {
        nom: "",
        prenom: "",
        titre: "",
        examen: "",
        rdvDate: "",
        indication: "",
        protocole: "",
        contenu:"",
        incomplet: false
      },
      redirect: false,
      autoSelectProtocoles: [],
      autoSelectModels: []
    };
  }

   componentDidMount() {
  
     this.getReport(window.location.pathname.replace("/edit-report/", ""));
   
     
  } 

  onChangeNom(e) {
    const nom = e.target.value;

    this.setState(function (prevState) {
      return {
        currentReport: {
          ...prevState.currentReport,
          nom: nom,
        },
      };
    });
  }

  onChangePrenom(e) {
    const prenom = e.target.value;

    this.setState(function (prevState) {
      return {
        currentReport: {
          ...prevState.currentReport,
          prenom: prenom,
        },
      };
    });
  }

  onChangeTitre(e) {
    const titre = e.target.value;

    this.setState(function (prevState) {
      return {
        currentReport: {
          ...prevState.currentReport,
          titre: titre,
        },
      };
    },() => this.apiTitre());
  }

  onChangeExamen(e) {
    const examen = e.target.value;

    this.setState(function (prevState) {
      return {
        currentReport: {
          ...prevState.currentReport,
          examen: examen,
        },
      };
    });
  }

  onChangeRdvDate(e) {
    const rdvDate = e.target.value;

    this.setState(function (prevState) {
      return {
        currentReport: {
          ...prevState.currentReport,
          rdvDate: rdvDate,
        },
      };
    });
  }

  onChangeIndication(e) {
    const indication = e.target.value;

    this.setState(function (prevState) {
      return {
        currentReport: {
          ...prevState.currentReport,
          indication: indication,
        },
      };
    });
  }

  onChangeProtocole(e) {
    const protocole = e.target.value;

    this.setState(function (prevState) {
      return {
        currentReport: {
          ...prevState.currentReport,
          protocole: protocole,
        },
      };
    });
  }

  onChangeContenu(e) {
    const contenu = e.target.value;

    this.setState(function (prevState) {
      return {
        currentReport: {
          ...prevState.currentReport,
          contenu: contenu,
        },
      };
    });
  }

  onChangeIncomplet(e) {
    //const incomplet = e.target.value;

    this.setState(function (prevState) {
      return {
        currentReport: {
          ...prevState.currentReport,
          incomplet: e.target.checked,
        },
      };
    });
  }

 /*  handleChange = () => {
    this.setState(() => ({
      incomplet: !this.state.currentReport.incomplet
    }))
  }; */

   
  apiTitre() {
    const queryTitre = this.state.currentReport.titre.slice(4,7);
    console.log("titre", this.state.currentReport.titre);
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

  getReport(id) {
    ReportsService.get(id).then((response) => {
      this.setState({
        currentReport: response.data,
      }, () => this.apiTitre());
    });
  }

  saveReport() {
    this.props
      .updateReport(this.state.currentReport.id, this.state.currentReport)
      .then(this.setState(() => ({
          redirect: true
        }))
      );
  }

  render() {
    const { redirect, currentReport, autoSelectModels, autoSelectProtocoles } = this.state;
    const str=currentReport.rdvDate;
    const goodDate = str.slice(0, 16);
  
    

    console.log(currentReport);
  
    
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className={`container-xxl  ${styles.form_color}`}>
         <div className="row">
           
           <div className="col-lg-8 px-5">
    <h1 className={styles.label_color}>Modification du patient</h1>
      <form>
        <div className="form-group">
            <label className={styles.label_color} htmlFor="nom">Nom</label>
            <input
              type="text"
              className="form-control"
              id="nom"
              required
              value={currentReport.nom}
              onChange={this.onChangeNom}
              name="nom"
            />
          </div>

          <div className="form-group">
            <label className={styles.label_color} htmlFor="prenom">Prenom</label>
            <input
              type="text"
              className="form-control"
              id="prenom"
              required
              value={currentReport.prenom}
              onChange={this.onChangePrenom}
              name="prenom"
            />
          </div>

          <div className="form-group">
            <label className={styles.label_color} htmlFor="titre">Titre</label>
            <input
              type="text"
              className="form-control"
              id="titre"
              required
              value={currentReport.titre}
              onChange={this.onChangeTitre}
              name="titre"
            />
          </div>

          <div className="form-group">
            <label className={styles.label_color} htmlFor="examen">Examen</label>
            <select
              className="form-control"
              id="examen"
              required
              value={currentReport.examen}
              onChange={this.onChangeExamen}
              name="examen"
            >
            <option>Choisir une option</option>
            <option value="IRMosteo">IRMosteo</option>
            <option value="IRMgene">IRMgene</option>
            </select>
          </div>

          <div className="form-group">
            <label className={styles.label_color} htmlFor="rdvDate">Date de rendez-vous</label>
            <input
              type="datetime-local"
              className="form-control"
              id="rdvDate"
              required
              value={goodDate}
              onChange={this.onChangeRdvDate}
              name="rdvDate"
            />
          </div>

          <div className="form-group">
            <label className={styles.label_color} htmlFor="indication">Indication</label>
            <textarea
              rows={3}
              cols={50}
              className="form-control"
              id="indication"
              required
              value={currentReport.indication}
              onChange={this.onChangeIndication}
              name="indication"
            />
          </div>

          <div className="form-group">
            <label className={styles.label_color} htmlFor="protocole">Protocole</label>
            <textarea
              rows={3}
              cols={50}
              className="form-control"
              id="protocole"
              required
              value={currentReport.protocole}
              onChange={this.onChangeProtocole}
              name="protocole"
            />
          </div>

          <div className="form-group">
            <label className={styles.label_color} htmlFor="contenu">Contenu</label>
            <textarea
              //type="textarea"
              className="form-control"
              id="contenu"
              required
              value={currentReport.contenu}
              onChange={this.onChangeContenu}
              name="contenu"
              rows={10}
              cols={50}
            />
          </div>
          <div className="form-group">
            <label className={styles.label_color}>
                <input
                  type="checkbox"
                  id="incomplet"
                  checked={currentReport.incomplet}
                  onChange={this.onChangeIncomplet}
                  name="incomplet"
                />
             Incomplet
             </label>
          </div>  
          <div className="row justify-content-around py-3">
            <div className="col-4" align="center">
          <button onClick={this.saveReport} className="btn btn-light">
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

export default connect(null, { updateReport, filterProtocoles, filterModels })(EditReport);
