  function abrir2(e) {
  const content = document.querySelector('.sgt2');
  const content2 = document.querySelector('.sgt');
  content.style.display = "block";
  content2.style.display = "none";
}

function abrir3(e) {
    let senha = document.getElementById('senha2');
    let senhaC = document.getElementById('senha');
    const content = document.querySelector('.sgt3');
    const content2 = document.querySelector('.sgt');

    if (senha.value != senhaC.value) {
    senhaC.setCustomValidity("Senhas diferentes!");
    senhaC.reportValidity();
    } 
    else {
    senhaC.setCustomValidity("");
    content.style.display = "block";
    content2.style.display = "none";
  }
}

function retur(element) {
  const content4 = document.querySelector('.mama');
  const content5 = document.querySelector('.sgt');
  content4.style.display = "block";
  content5.style.display = "none";
}

function retur2(element) {
  const content6 = document.querySelector('.sgt');
  const content7 = document.querySelector('.sgt2');
  content6.style.display = "block";
  content7.style.display = "none";
}

function redirect(url) {
  window.location.href = url;
}

function geolocation() {
  const content = document.querySelector('.sgt2');
  const content2 = document.querySelector('.sgt3');
  content.style.display = "block";
  content2.style.display = "none";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      ons.notification.alert("Latitude: " + latitude + "\nLongitude: " + longitude, {
        callback: function() {
        }
      });
    }, function(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          ons.notification.alert("Permissão de geolocalização negada pelo usuário.");
          break;
        case error.POSITION_UNAVAILABLE:
          ons.notification.alert("Informações de geolocalização não estão disponíveis.");
          break;
        case error.TIMEOUT:
          ons.notification.alert("Tempo limite expirado ao tentar obter a geolocalização.");
          break;
        case error.UNKNOWN_ERROR:
          ons.notification.alert("Ocorreu um erro desconhecido ao tentar obter a geolocalização.");
          break;
      }
    });
  } else {
    ons.notification.alert("Geolocalização não está disponível neste dispositivo.");
  }
}

function abrir4() {
    const content = document.querySelector('.sgt2');
    const content2 = document.querySelector('.sgt3');
    content.style.display = "block";
    content2.style.display = "none";
}

function mascara(i){
   var v = i.value;
   if(isNaN(v[v.length-1])){
      i.value = v.substring(0, v.length-1);
      return;
   } 
   i.setAttribute("maxlength", "14");
   if (v.length == 3 || v.length == 7) i.value += ".";
   if (v.length == 11) i.value += "-";
}

function abrir() {
  const content = document.querySelector('.sgt');
  const content2 = document.querySelector('.mama');
  const alerta = document.getElementById('email-null')
  if (document.getElementById('nome').value.length == "") {
      alerta.style.display = "block";
      return false;
  }
  if (document.getElementById('email').value.length == "") {
      alerta.style.display = "block";
      return false;
  }
  if (document.getElementById('cpf').value.length == "") {
      alerta.style.display = "block";
      return false;
  }
  else {
      content.style.display = "block";
      content2.style.display = "none";
      alerta.style.display = "none";
      const email = document.getElementById('email').value;
            document.getElementById('codigoVerificacao').textContent = email;
  }
}

