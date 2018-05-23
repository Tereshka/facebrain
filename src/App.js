import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import myParameters from './particlesjs-config.json';
// import base64Img from 'base64-img';
var base64Img = require('base64-img');
const fs = require('fs');

// const url = "https://facebrain-server.herokuapp.com";
const url = "https://localhost:3001";

const initialState = {
    input: '',
    inputUrl: '',
    box: [{}],
    route: 'signin',
    isSignedIn: false,
    selectedFile: null,
    user: {
      id: 0,
      name: "",
      email: "",
      entries: 0,
      joined: ""
    }
};

class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entry,
          joined: data.joined
        }});
  }

  onInputChange = (event) => {
    console.log(event.target);
    this.setState({box: [{}]});
    this.setState({input: ''});
    this.setState({input: event.target.value});
    this.setState({inputUrl: event.target.value});
    console.log(this.state.input + " ==" + this.state.inputUrl);
  }

  fileSelectedHandler = (event) => {
    // this.setState({
    //   selectedFile: event.target.files[0]
    // });
    // this.setState({input: URL.createObjectURL(event.target.files[0])});
    //  console.log(event.target.files[0]);
    //  console.log(URL.createObjectURL(event.target.files[0]));

    var file = event.target.files[0];
    var urlFile = URL.createObjectURL(file);
    // var reader = new FileReader();
    // reader.onloadend = function() {
    //   data = reader.result.replace(/^data:image\/(png|jpg);base64,/, "");
    //   console.log('RESULT', reader.result);
    //   console.log('DATA', data);
    // }
    // reader.readAsDataURL(file);
    const formData = new FormData()
    formData.append('myFile', file, file.name)
    // var data = await fs.readFileSync(file, { encoding: 'base64' });

     this.setState({inputUrl: urlFile});
     this.setState({input: urlFile.replace("blob:", "")});
  }

  onButtonSubmit =() => {
    console.log( "+++++++ " + this.state.input);
    
    fetch(url + "/imageurl", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
      .then(response => response.json())
      .then( response => {
        if(response){
          fetch(url + "/image", {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user,{entries: count}));
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  }

  calculateFaceLocation = (data) => {
    if (Object.keys(data.outputs[0].data).length === 0) { return [];}

    var a = data.outputs[0].data.regions;
    var faces = [];
    
    for(var i=0; i< a.length; i++){
      faces.push(a[i].region_info.bounding_box);
    }
    
    var image = document.getElementById("inputImage");
    var width = Number(image.width);
    var height = Number(image.height);

    var boxes = faces.map(s => {
      return {
        leftCol: s.left_col * width,
        topRow: s.top_row * height,
        rightCol: width - (s.right_col * width),
        bottomRow: height - (s.bottom_row * height)
      }
    });
    return boxes;
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    var {box, inputUrl, route, isSignedIn} = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={myParameters}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} 
                  onButtonSubmit={this.onButtonSubmit} 
                  fileSelectedHandler={this.fileSelectedHandler}/>
              <FaceRecognition box={box} imageUrl={inputUrl} />
            </div>  
          : (route === 'signin' || route === 'signout'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)  
        }
      </div>
    );
  }
}

export default App;
