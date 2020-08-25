import React, { Component } from 'react';
import './App.css';

import Navigation from './components/Navigation/Navigation.component';
import Logo from './components/Logo/Logo.component';
import ImageLinkFrom from './components/ImageLinkFrom/ImageLinkFrom.component';
import Rank from './components/Rank/Rank.component';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.component';
import Signin from './components/Signin/Signin.component';
import Register from './components/Register/Register.component';
import Particles from 'react-particles-js';
//API : 
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: '555d47e47ba9470b9e41492d06ed51b8'
 });


 
const ParticlesOptions = { 

      particles: {
         number: {
           value : 100,
           density : {
             enable : true ,
             value_area: 800
           }
         }
    }
} 


class App extends Component {
   
  constructor() {
    super();

    this.state = {
       input: '' , 
       imageUrl:'' , 
       box:{} ,
       route: '' , 
       isSignedIn : false
    }

  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
     this.setState({ box:box })
  }
   


  onInputChange = (e) =>{
     this.setState({ input: e.target.value });
  }

  buttonOnSubmit = () => {

    this.setState({ imageUrl: this.state.input });
    //  Api :
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then (response => this.displayFaceBox( this.calculateFaceLocation(response) ) )
    .catch(err => console.log(err) ); 

  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() { 
      
    const { isSignedIn , route , box , imageUrl } = this.state ;

    return (
      <div className="App">
        <Particles className='Particles'  params={ParticlesOptions} />
        <Navigation isSignedIn={isSignedIn}  onRouteChange={this.onRouteChange} />
         { 
              route === 'home' ? 
            <div>
            <Logo /> 
              <Rank />
              <ImageLinkFrom onInputChange={this.onInputChange}  buttonOnSubmit={this.buttonOnSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>  : (
              route === 'signin' ? 
              <Signin onRouteChange={this.onRouteChange}/>  :
              <Register onRouteChange={this.onRouteChange}/>  
            )
          
         }
      </div>
    );

  }

}

export default App;
 