import React, { Component } from 'react';
import { connect } from "react-redux";
import { retrieveReports } from "../reports/actions";
import Timeline from './components/Timeline';
import './index.css';

class TimeLinePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choiceDate: []
     
    };

    this.handleChange = this.handleChange.bind(this);
  }


 
   componentDidMount() {
    this.props.retrieveReports()
    .then(() => {
      console.log("componentdidmount",this.props.reports);
      const lastChoiceDate = localStorage.getItem("LAST_DATE");
      if(!lastChoiceDate){
        const sortedReports = this.props.reports.slice().sort((a, b) => b.rdvDate < a.rdvDate ? 1: -1);
      this.setState({
        choiceDate: sortedReports[0].rdvDate.slice(0,10),
      });
      }else{
        this.setState({
      
        choiceDate: lastChoiceDate,
      }, () => {
       
        document.querySelector('#choiceDate').value = lastChoiceDate;
     
              }
            );
      }
    });
  } 

 


  handleChange(e) {
   
    this.setState({ 
      choiceDate: e.target.value
     }, localStorage.setItem("LAST_DATE",e.target.value));
     console.log("LAST_DATE", localStorage.getItem("LAST_DATE"))
  }

  render() {
   
    const { reports } = this.props;
    const { choiceDate } = this.state;
    console.log("choiceDate", choiceDate);
    const sortedReports = reports.slice().sort((a, b) => b.rdvDate < a.rdvDate ? 1: -1);
    const uniqueArray = sortedReports.map(sortedReport => sortedReport.rdvDate.slice(0,10));
    console.log("uniqueArray", uniqueArray);
    const uniqueArrayDate = [...new Set(uniqueArray)];
    console.log("uniqueArrayDate", uniqueArrayDate);
    const sortedUniqueReportsObjet = new Set(uniqueArray);
    const sortedUniqueReports = [...sortedUniqueReportsObjet];
    console.log("sortedUniqueReports", sortedUniqueReports);
    const filterReports = sortedReports.filter(function (sortedReport) {
      // return sortedReport.rdvDate.slice(0,10) === choiceDate;
      return choiceDate.includes(sortedReport.rdvDate.slice(0,10)) ;
    });
    console.log("choiceDate", choiceDate);
    console.log("sortedReports",sortedReports);
    console.log("filterReports",filterReports);
    // console.log("uniqueArray", uniqueArray);
    console.log("sortedUniqueReports", sortedUniqueReports);

    if (sortedReports){
      
      return (
      <div>
        
          <div align="center">
             <select className="form-select text-center" name="choiceDate" id="choiceDate" 
             onChange={this.handleChange} 
             style={{width: "200px"}}>
               
               {sortedUniqueReports.map((sortedUniqueReport,index) => (
              <option key={index} value={sortedUniqueReport}>{sortedUniqueReport}</option>
               ))}
               <option value={sortedUniqueReports}>All</option>
              </select>
          </div>
        
        <Timeline datas={filterReports} />
      </div>
    );
    }
    
  }
}

const mapStateToProps = (state) => {
  return {
    reports: state.reports,
  };
};

export default connect(mapStateToProps, { retrieveReports })(TimeLinePage);

