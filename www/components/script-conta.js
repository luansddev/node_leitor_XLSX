function opendiv() {
    const content = document.querySelector('.conteudo-menu');
    content.classList.toggle("aberta");
    element.style.display = "none";
  }

  function redirect(url) {
    window.location.href = url;
  }

  function abrir2() {
    const content = document.querySelector('.verification');
    e = document.querySelector('.pass');
    content.style.display = "block";
    e.style.display = "none";
  }

  function abrir3(e) {
    const content = document.querySelector('.end');
    e = document.querySelector('.verification');
    content.style.display = "block";
    e.style.display = "none";

    validaremail();
    validarnumero();
  }

  function abrir4(e) {
    const content = document.querySelector('.verification-2');
    content.classList.add("aberta");
    e.style.display = "none";
    content.scrollIntoView({ behavior: 'smooth' });
  }

  function abrir5(e) {
    const content = document.querySelector('.end-2');
    content.classList.add("aberta");
    e.style.display = "none";
    content.scrollIntoView({ behavior: 'smooth' });
  }

  function abrir6(e) {
    const content = document.querySelector('.verification-3');
    content.classList.add("aberta");
    e.style.display = "none";
    content.scrollIntoView({ behavior: 'smooth' });
  }

  function abrir7(e) {
    const content = document.querySelector('.end-3');
    content.classList.add("aberta");
    e.style.display = "none";
    content.scrollIntoView({ behavior: 'smooth' });
  }

  function retur() {
    const content = document.querySelector('.verification');
    const content2 = document.querySelector('.pass');
    content.style.display = "none";
    content2.style.display = "block";
  }

  function retur2() {
    const content = document.querySelector('.verification');
    const content2 = document.querySelector('.end');
    content.style.display = "block";
    content2.style.display = "none";
  }

  function close() {
      const content = document.querySelector('.conteudo-menu');
      content.style.display = "none";
  }

  function validaremail() {
    const email = document.getElementById('email').value;
              document.getElementById('codigoVerificacao').textContent = email;
  }
