import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';

//var socket = io('localhost:5000');
var socket = io('172.20.10.5:5000');    //Serverin ip adresini yaz


class App extends Component {

  constructor(props){
    super(props);

    //degisimlerde anlik guncellenebilmesi icin stateleri tanimladik
    this.state = {
      humidity:0,
      temperature:0,
      foodLevel:false
    }
  }

  componentDidMount() {

  }


  onForwardPress = (event) => {
      event.stopPropagation();
      console.log("asad");
      socket.emit('direction', 'forward'); // 2. Start rotation
    }

    onBackwardPress = (event) => {
      event.stopPropagation();
      socket.emit('direction', 'backward'); // 2. Start rotation
    }
  onRelease = (event) => {
      event.stopPropagation();
      socket.emit('direction', 'stop'); // 3. Stop rotation
    }

    //dataları okuduğumuz fonksiyon
    readData = () => {
      //isi sensoru socket baglantisi
      socket.on('HEAT_SENSOR_UPDATE', (heatSensor) => {
        this.setState({humidity : heatSensor.humidity,
                      temperature : heatSensor.temperature});
      });
      //Mama sensoru socket baglantisi
      socket.on('FOOD_SENSOR_UPDATE', (foodSensor) => {
        this.setState({foodLevel : foodSensor.isFull});
      });
    }


  render() {

    this.readData();
    const foodLevel = this.state.foodLevel;
    let food;
    if(foodLevel){
      console.log("dolu");
      food = <div class="w3-light-grey w3-round-xlarge w3-small">
      <div class="w3-container w3-center w3-round-xlarge w3-green" style={{width:300/100*100}}>
<div class="w3-center w3-text-white">Dolu</div>
      </div>
    </div>
    }else{
      console.log("bos");
      food = <div class="w3-light-grey w3-round-xlarge w3-small">
      <div class="w3-container w3-center w3-round-xlarge w3-red" style={{width:300/100*20}}>
<div class="w3-center w3-text-white">Bos!</div>
      </div>
    </div>
    }

      return (
       /* <div className="App">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <button
            className="btn fa-atom"
            onMouseDown={this.onForwardPress}
            onMouseUp={this.onRelease}
            onTouchCancel={this.onRelease}
          >
          </button>
          <button
            className="btn  fa-rocket"
            onMouseDown={this.onBackwardPress}
            onMouseUp={this.onRelease}
            onTouchCancel={this.onRelease}
          >
            </button>
          <a>temp is {this.state.temperature} °C</a>
          <a>humidity is {this.state.humidity}%</a>
        </div>*/





<body class="w3-light-grey">

<title>W3.CSS Template</title>

<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto'></link>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
<style>
html,body,h1,h2,h3,h4,h5,h6
</style>

  <div class="w3-row-padding">
  <div class="w3-content w3-margin-top " style={{width:350}}>
    <div class="w3-third">

      <div class="w3-white w3-text-grey w3-card-4">
        <div class="w3-display-container">
          <div class="w3-display-bottomleft w3-container w3-text-black">
            <h2>Akıllı Evcil Hayvan Otomasyonu</h2>
          </div>
        </div>
        <div class="w3-container">
          <p><i class="fa fa-home fa-fw w3-margin-right w3-large w3-text-teal"></i>Akıllı Evcil Hayvan Otomasyonu</p>
          <p><i class="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i>ex@mail.com</p>
          <p><i class="fa fa-phone fa-fw w3-margin-right w3-large w3-text-teal"></i>+905431111111</p>
          <hr></hr>

          <p class="w3-large"><b><i class="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>Değerler</b></p>
          <p>Ev Sıcaklığı</p>
          <div class="w3-light-grey w3-round-xlarge w3-small">
            <div class="w3-container w3-center w3-round-xlarge w3-green" style={{width : 350/100* this.state.temperature}}>{this.state.temperature}°C</div>
          </div>
          <p>Mama Seviyesi</p>
          {food}
          <p>Su Seviyesi</p>
          <div class="w3-light-grey w3-round-xlarge w3-small">
            <div class="w3-container w3-center w3-round-xlarge w3-teal" style={{width:300/100*75}}>75%</div>
          </div>
          <p>Nem Seviyesi</p>
          <div class="w3-light-grey w3-round-xlarge w3-small">
            <div class="w3-container w3-center w3-round-xlarge w3-teal" style={{width: 350/100* this.state.humidity}}>{this.state.humidity}%</div>
          </div>
          <br></br>

          <p class="w3-large w3-text-theme"><b><i class="fa fa-globe fa-fw w3-margin-right w3-text-teal"></i>Ortam</b></p>
          <p>Isıtıcı Durumu</p>
          <label class="switch">
  <input type="checkbox"></input>
  <span class="slider round"></span>
  </label>
          <p>Mama Ver</p>
          <div class="w3-light-grey w3-round-xlarge">
          <button
            className="btn fa-atom"
            onMouseDown={this.onForwardPress}
            onMouseUp={this.onRelease}
            onTouchCancel={this.onRelease}
          >
          </button>
          </div>
          <p>Su Ver</p>
          <div class="w3-light-grey w3-round-xlarge">
            <button
            className="btn fa-atom"
            onMouseDown={this.onForwardPress}
            onMouseUp={this.onRelease}
            onTouchCancel={this.onRelease}
          >
          </button>
          </div>
          <br>
       </br></div></div></div></div></div>



<footer class="w3-container w3-teal w3-center w3-margin-top">
  <p>Furkan Cakmak</p>
  <i class="fa fa-facebook-official w3-hover-opacity"></i>
  <i class="fa fa-instagram w3-hover-opacity"></i>
  <i class="fa fa-snapchat w3-hover-opacity"></i>
  <i class="fa fa-pinterest-p w3-hover-opacity"></i>
  <i class="fa fa-twitter w3-hover-opacity"></i>
  <i class="fa fa-linkedin w3-hover-opacity"></i>
  <p>Automation by <a href="https://www.github.com/cakmakfurkan" target="_blank">PetAu</a></p>
</footer>
       </body>
      );
    }
  }


export default App;
