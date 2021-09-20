import React, { Component } from "react";
import { connect } from "react-redux";
import { updateReport } from "./actions";
import { Redirect, Link } from "react-router-dom";
import ReportsService from "./reportsService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

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
      isBtnActive: false,
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

 


   copyDivToClipboard(id) {
    
    this.setState(() => ({
      isBtnActive: true
    }));
    var range = document.createRange();
    range.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    //faCopyBtn.classList.add("active");
   
    console.log(this.state.isBtnActive);
    window.getSelection().removeAllRanges();// to deselect
     setTimeout(() => {this.setState(() => ({
      isBtnActive: false,
      
    }));
    console.log(this.state.isBtnActive);
      },2500); 

      console.log(this.state.isBtnActive);
      
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
                  <pre>
                    <p id="indicationArea" className={styles.text_cr}>{currentReport.indication}</p>
                  </pre>
                  <div className={`${styles.copyText} d-flex justify-content-end `}>
                      <button onClick={() => {this.copyDivToClipboard("indicationArea")}}>
                      <FontAwesomeIcon icon={faCopy} size="xs"/></button>
                  </div>
                </div>
                <br></br>
                <div>
                  <h3 className={styles.text_cr}>technique:</h3>
                  <p id="protocoleArea" className={styles.text_cr}>{currentReport.protocole}</p>
                  <div className={`${styles.copyText} d-flex justify-content-end`}>
                      <button onClick={() => {this.copyDivToClipboard("protocoleArea")}}>
                      <FontAwesomeIcon icon={faCopy} size="xs"/></button>
                  </div>
                </div>
                <br></br>
                <div>
                  <h3 className={styles.text_cr}>résultat:</h3>
                  <pre>
                    <p id="contenuArea" className={styles.text_cr}>{currentReport.contenu}</p>
                  </pre>
                  <div className={`${styles.copyText} d-flex justify-content-end`}>
                      <button onClick={() => {this.copyDivToClipboard("contenuArea")}}>
                      <FontAwesomeIcon icon={faCopy} size="xs"/></button>
                  </div>
                 
                 <br></br>
                </div>
                <div>
                  <h3>Conclusion:</h3>
                </div>
                
            </div>  
            {/* fin de la zone à copier */}

            <div className="container">
              <div className="row">
                <div className="col-6 d-flex justify-content-center align-items-center">
                  <div className={`${styles.copyText}`} align="center">
                {/* <span>Cliquer pour copier:</span> */}
                  <button onClick={() => {this.copyDivToClipboard("copyArea")}}>
                    <FontAwesomeIcon icon={faCopy} size="xs"/></button>
                </div>
               
               </div>
               
            <div className={`${styles.copyText2} col-6`} >
                 <Link to="/">
              <button className="btn btn-secondary">Accueil</button>
            </Link>
               </div>
                 
                  
                    
                 
            </div>
           {/* fin de la deuxième zone container */}
          </div>
          </div>
       </div>
      </div>



      
    );
  }
}

export default connect(null, { updateReport })(ShowReport);
