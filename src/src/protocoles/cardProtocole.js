import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

import styles from "./cardProtocole.module.css";



const CardProtocole = ({protocole, borderColor = '#009688'}) => {

 
  const [color, setColor] = useState();
  //const history = useHistory();
 
  const showBorder = () => {
    setColor(borderColor);
  };
 
  const hideBorder = () => {
    setColor('#f5f5f5');
  };

  const copyDivToClipboard = (e) => {
   
    const content = e.target.innerText;
    console.log(content);
  // Create textarea element
  const textarea = document.createElement('textarea');
  
  // Set the value of the text
  textarea.value = content;
  
  // Make sure we cant change the text of the textarea
  textarea.setAttribute('readonly', '');
  
  // Hide the textarea off the screnn
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  
  // Add the textarea to the page
  document.body.appendChild(textarea);

  // Copy the textarea
  textarea.select();
document.execCommand('copy');

  textarea.remove();
   /*  var range = document.createRange();
 
    range.selectNode(document.getElementById());
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect */
}


  if (protocole.protocoleTitre){

  
  return (
  
    <div className="col s12 m6 l4 py-2" onMouseEnter={showBorder} onMouseLeave={hideBorder}>
      <div className="card"  style={{ borderColor: color }}>
        <div className={styles.pointer}>
              <div className="d-flex justify-content-between card-titre" >
              
              <span>{protocole.protocoleTitre}</span><FontAwesomeIcon icon={faCopy} />
              
            </div>
              
              <div id={protocole.id} className="card-content" onClick={e => {copyDivToClipboard(e)}}>
                <p  className={styles.card_box}>{protocole.protocoleContent}</p>
              </div>

        </div>
       

      </div> 
    </div>
  )} return null;
}
 
export default CardProtocole;