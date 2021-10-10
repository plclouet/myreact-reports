import React, { Component } from 'react';
import { connect } from "react-redux";
import { retrieveReports } from "../reports/actions";
import Timeline from './components/Timeline';
import './index.css';

class TimeLinePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choiceDate: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }


 
   componentDidMount() {
    this.props.retrieveReports()
    .then(() => {
      this.setState({
        choiceDate: this.props.reports[0].rdvDate.slice(0,10),
      });
    });
  } 


  handleChange(e) {
   
    this.setState({ choiceDate: e.target.value });
  }

  render() {
   
    const { reports } = this.props;
    const { choiceDate } = this.state;
    const sortedReports = reports.slice().sort((a, b) => b.rdvDate < a.rdvDate ? 1: -1);
    const uniqueArray = sortedReports.map(sortedReport => sortedReport.rdvDate.slice(0,10));
    const sortedUniqueReportsObjet = new Set(uniqueArray);
    const sortedUniqueReports = [...sortedUniqueReportsObjet];
    const filterReports = sortedReports.filter(function (sortedReport) {
      return sortedReport.rdvDate.slice(0,10) === choiceDate;
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


/*   state = {
    timelineData: [
      {
        nom: 'CLOUET',
        prenom: 'pierre-louis',
        titre: 'IRM genou',
        rdvDate: 'March 03 2017',
        examen: 'IRMosteo',
        category: {
          tag: 'medium',
          color: '#018f69'
           },
      },
      {
        nom: 'PENEZ',
        prenom: 'fabienne',
        titre: 'IRM encephale',
        rdvDate: 'Novembre 12 2019',
        examen: 'IRMgene',
        category: {
          tag: 'tag-two',
          color: '#018f69'
           },
      },
      {
        nom: 'CLOUET',
        prenom: 'alex',
        titre: 'IRM cervicale',
        rdvDate: 'décembre 12 2021',
        examen: 'IRMgene',
        category: {
          tag: 'tag-two',
          color: '#018f69'
           },
      },
      {
        nom: 'CLOUET',
        prenom: 'eleonore',
        titre: 'IRM doigt',
        rdvDate: 'mai 12 2021',
        examen: 'IRMgene',
        category: {
          tag: 'tag-two',
          color: '#018f69'
           },
      },


    ]
  } */