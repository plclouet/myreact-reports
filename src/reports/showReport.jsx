import React, { Component } from "react";
import { connect } from "react-redux";
import { updateReport } from "./actions";
import { Redirect, Link } from "react-router-dom";
import ReportsService from "./reportsService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
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

 


   copyDivToClipboard(id,btn) {
    
    
    var range = document.createRange();
    range.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    //faCopyBtn.classList.add("active");
   
    console.log(this.state.isBtnActive);
    window.getSelection().removeAllRanges();// to deselect
    var tooltip = document.getElementById(btn);
    tooltip.style.visibility = "visible";
    setTimeout(function(){ tooltip.style.visibility = "hidden";}, 1000);
      
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
              <div className="mx-auto px-3 col-sm-8">

            <h4>Patient(e) {currentReport.nom} {currentReport.prenom}</h4>
            <br></br>

              <div className="d-flex justify-content-center align-items-center">
              <button type="button" className="btn btn-warning m-2" onClick={() => {this.copyDivToClipboard("indicationArea","myBtn1")}}>ind</button>
              <div className={`${styles.tooltip}`}>
              <span className={`${styles.tooltiptext}`} id="myBtn1">copied</span>
              </div>
              <button type="button" className="btn btn-primary m-2" onClick={() => {this.copyDivToClipboard("protocoleArea","myBtn2")}}>tech</button>
              <div className={`${styles.tooltip}`}>
              <span className={`${styles.tooltiptext}`} id="myBtn2">copied</span>
              </div>
              <button type="button" className="btn btn-info m-2" onClick={() => {this.copyDivToClipboard("contenuArea","myBtn3")}}>rslt</button>
              <div className={`${styles.tooltip}`}>
              <span className={`${styles.tooltiptext}`} id="myBtn3">copied</span>
              </div>
              <button type="button" className="btn btn-success m-2" onClick={() => {this.copyDivToClipboard("copyArea","myBtn4")}}>All</button>
              <div className={`${styles.tooltip}`}>
              <span className={`${styles.tooltiptext}`} id="myBtn4">copied</span>
              </div>
              </div>

              <div className={`${styles.text_cr} py-3`}  id="copyArea">
               
                  <h1 className={styles.titre_cr}>{currentReport.titre}:</h1>
                  <pre>
                  <p id="indicationArea" className={`${styles.text_cr}  mb-4`}>{currentReport.indication}</p>
                  <br></br>
                  </pre>

                  <h3 className={styles.titre_cr}>technique:</h3>
                  <pre>
                  <p id="protocoleArea" className={`${styles.text_cr} mb-4`}>{currentReport.protocole}</p>
                  <br></br>
                  </pre>

                  <h3 className={styles.titre_cr}>résultat:</h3>
                  <pre>
                  <p id="contenuArea" className={`${styles.text_cr} mb-4`}>{currentReport.contenu}</p>
                  <br></br>
                  </pre>

                  <h3 className={styles.titre_conclusion}>Conclusion:</h3>
                
            </div>  
            {/* fin de la zone à copier */}

            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <div className={`${styles.tooltip} d-flex justify-content-end align-items-center p-3`} align="center">
                <Link to="/">
                    <button className="m-2"><FontAwesomeIcon icon={faHome} size="xs"/></button>
                  </Link>
                 {/* <span className="m-2" >Pour tout copier:</span>  */}
                  <button onClick={() => {this.copyDivToClipboard("copyArea","myBtn4")}}>
                  <span className={`${styles.tooltiptext}`} id="myBtn4">copied</span>
                    <FontAwesomeIcon icon={faCopy} size="xs"/></button>
                  
                </div>
               
               </div>
               
           {/*  <div className={`${styles.copyText2} col-6`} >
                 <Link to="/">
              <button className="btn btn-secondary">Accueil</button>
            </Link>
               </div> */}
                 
                  
                    
                 
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
