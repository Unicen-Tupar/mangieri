"use strict";

let nroPartida;
let contarCartas;
let tableroInicial= true;
let cartasDestapadas=[];
let cartasUsadas=[];
let aciertosTotales=0;
let erroresTotales=0;
let erroresParciales;
let aciertosParciales;
const nroCartas=5;

function incrementarAciertos(){
  aciertosParciales++;
  aciertosTotales++;
  document.getElementById('aciertoPartida').innerHTML= aciertosParciales;
  document.getElementById('aTotal').innerHTML=aciertosTotales;
}

function incrementarErrores(){
  erroresParciales++;
  document.getElementById('errorPartida').innerHTML= erroresParciales;
  erroresTotales ++;
  document.getElementById('eTotal').innerHTML= erroresTotales;
}

function mostrarFelicitacion(nroPartida){
  if (nroPartida===3){
      nroPartida=0;
      alert("Felicitaciones!!! Jugaste 3 partidas seguidas");
  }
}

function ponerReversoCarta(){
  for (let i = 0; i < nroCartas; i++) {
    let carta= document.getElementById(`carta${i}`);
    carta.src="images/reverso.jpg";
  }
}

function taparCartas(tiempo){
  let intervalo= setInterval(function(){
      if (tiempo === 0){
        clearInterval(intervalo);
        ponerReversoCarta();
      }
      else {
        tiempo--;
      }
  },1000);
}

function girarCarta(cartaParaMostrar){
    let carta= document.getElementById(`carta${cartaParaMostrar}`);
    if (cartasDestapadas[cartaParaMostrar]==='x'){
        carta.src="images/cartaCruz.jpg";
    }
    else {
        carta.src="images/cartaBlanco.jpg";
    }
}

function generarTablero(){
    let probabilidad=0;
    contarCartas=0;
    if (tableroInicial){
        for (let i=0; i<nroCartas; i++){
            probabilidad= Math.random();
            if (probabilidad< 0.5){
                cartasDestapadas[i]= 'blanco';
            }
            else {
                cartasDestapadas[i]= 'x';
                contarCartas++;
            }
        }
        tableroInicial= false;
    }
    else {
      for (let i=0; i< nroCartas; i++){
          if (cartasDestapadas[i]==='x'){
              cartasDestapadas[i]='blanco';
          }
          else {
              cartasDestapadas[i]='x';
              contarCartas++;
          }
      }
      tableroInicial= true;
    }
}

function cargarCartas(){
    generarTablero();
    let carta;
    for(let i=0; i<nroCartas; i++){
        carta= document.getElementById(`carta${i}`);
        if(cartasDestapadas[i]==='x'){
            carta.src= "images/cartaCruz.jpg";
        }
        else {
            carta.src= "images/cartaBlanco.jpg";
        }
    }
}

function mostrarTablero(){
  nroPartida ++;
  aciertosParciales= 0;
  document.getElementById('aciertoPartida').innerHTML= aciertosParciales;
  erroresParciales= 0;
  document.getElementById('errorPartida').innerHTML= erroresParciales;
  cargarCartas();
  taparCartas(3);
  let radios = document.getElementsByName('radio');
  for (let i = 0; i < radios.length; i++) {
      radios[i].disabled = false;
      radios[i].checked=false;
      cartasUsadas[i]= false;
  }
}

function obtenerValorRadioBtn(){
  let eleccion= document.getElementsByName('radio');
  for (let i = 0; i < eleccion.length; i++) {
    if (eleccion[i].checked) {
        return parseInt(eleccion[i].value,10);
    }
  }
  return null;
}

function jugar(){
    let botonCheckeado= obtenerValorRadioBtn();
    if ((botonCheckeado!== null) &&(!cartasUsadas[botonCheckeado])){
          if (cartasDestapadas[botonCheckeado]==='x') {
               incrementarAciertos();
               contarCartas--;
          }
          else{
             incrementarErrores();
          }
          cartasUsadas[botonCheckeado]= true;
          girarCarta(botonCheckeado);
          let radios = document.getElementsByName('radio');
          radios[botonCheckeado].disabled = true;
          if(contarCartas===0){
              alert("Ganaste!!");
              for (let i = 0; i < radios.length; i++) {
                  radios[i].disabled = true;
              }
          }
          mostrarFelicitacion(nroPartida);
          // MUESTRA SIEMPRE Y NO CUANDO DEBE
          // FALTA EL CARTEL QUE GANO CUANDO NO HAY NINGUNA MARCA
    }else {
      alert ("No seleccionaste ninguna carta activa!!");
    }
}

document.getElementById('btn-comenzar').onclick = mostrarTablero;
document.getElementById('btn-confirmar').onclick= jugar;
