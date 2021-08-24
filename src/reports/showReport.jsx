import React, { Component } from "react";
import { connect } from "react-redux";
import { updateReport } from "./actions";
import { Redirect, Link } from "react-router-dom";
import ReportsService from "./reportsService";

import styles from "./showReport.module.css";

class ShowReport extends Component {
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
    this.saveReport = this.saveReport.bind(this);
    this.copyDivToClipboard = this.copyDivToClipboard.bind(this);

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
      },
      redirect: false,
    };
  }

   componentDidMount() {
    this.getReport(window.location.pathname.replace("/show-report/", ""));
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
    });
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


  getReport(id) {
    ReportsService.get(id).then((response) => {
      this.setState({
        currentReport: response.data,
      });
    });
  }

  saveReport() {
    this.props
      .updateReport(this.state.currentReport.id, this.state.currentReport)
      .then(this.setState(() => ({
        redirect: true
      })));
  }

   copyDivToClipboard() {
    var range = document.createRange();
    range.selectNode(document.getElementById("copyArea"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
}

  render() {
    const { redirect, currentReport } = this.state;
    const str=currentReport.rdvDate;
    const goodDate = str.slice(0, 16);

    

   console.log(goodDate);
  
    
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
     
          <div className="container py-5">

            <div className="row">
              <div className="mx-auto px-5 col-sm-8">
            <h4>Compte rendu du patient {currentReport.nom} {currentReport.prenom}</h4>
            <div className="py-5"  id="copyArea">
                <div className={styles.text_cr}>
                  <h1 className={styles.text_cr}>{currentReport.titre}</h1>
                  <p className={styles.text_cr}>{currentReport.indication}</p>
                </div>
                <br></br>
                <div>
                  <h3 className={styles.text_cr}>technique:</h3>
                  <p className={styles.text_cr}>{currentReport.protocole}</p>
                </div>
                <br></br>
                <div>
                  <h3 className={styles.text_cr}>résultat:</h3>
                  <p className={styles.text_cr}>{currentReport.contenu}</p>
                 
                 <br></br>
                </div>
                <div>
                  <h3>Conclusion:</h3>
                </div>
                
            </div>
            <div className="row justify-content-around py-3">
            <div className="col-4" align="center">
            <button onClick={this.copyDivToClipboard} className="btn btn-outline-success">
                  Copy
            </button>
            </div>
            <div className="col-4" align="center">
            <Link to="/">
              <button className="btn btn-outline-secondary">Accueil</button>
            </Link>
            </div>
            </div>
          </div>
       </div>
      </div>
      
    );
  }
}

export default connect(null, { updateReport })(ShowReport);
