import React from 'react';
import { render } from 'react-dom';
import './styles.css';

const pcs = [
	{ "modelis":"lenovo idėja", "kaina":1234, "spalva":{"raudona":1,"žalia":2} },
	{ "modelis":"hp monstras", "kaina":800, "spalva":{"juoda":2,"geltona":0} },
	{ "modelis":"toshiba sriuba", "kaina":256, "spalva":{"mėlyna":3,"žalia":1} },
	{ "modelis":"dell apskritimas", "kaina":697, "spalva":{"juoda":1,"balta":2} },
	{ "modelis":"acer peizažas", "kaina":620, "spalva":{"juoda":4,"balta":2} },
	{ "modelis":"apple 256", "kaina":2560, "spalva":{"balta":3,"juoda":1} },
	{ "modelis":"asus pokšt", "kaina":1001, "spalva":{"juoda":2,"geltona":3} }
];

const filter = (array) =>{
  for(let i = 0; i < array.length; i++) {
    let is = false;
    let string = '';
    let pc = array[i];
    if ( (pc.kaina * 2)<= 1600 ){
      string += "Modelis: " + pc.modelis + " Kaina: " + pc.kaina * 2;
      let colors = Object.entries(pc.spalva);
      for (let j = 0; j < colors.length; j++){
        let color = colors[j];
        if (color[1] >= 2) {
          string = (is) ? string += " ir " + color[0] : string += " Spalva: " + color[0];
          is = true; 
        }
        }
      }
      console.log(string);
    }
  }

console.log(filter(pcs));

render(
  <div className="greeting">
    Hello!
    I am a working app. Consult your mentor if you got this far.
  </div>,
  document.querySelector('.app')
);
