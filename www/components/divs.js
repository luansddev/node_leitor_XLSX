function coment(element) {
  var comentDiv = element.previousElementSibling;
  comentDiv.style.display = (comentDiv.style.display == 'none') ? 'block' : 'none';

  if(execute == 0){
    execute = 1;
    comentDiv.style.display = (comentDiv.style.display == 'none') ? 'block' : 'none'
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var closeButtons = document.querySelectorAll('.close');
  closeButtons.forEach(function(button) {
    button.addEventListener('click', close);
  });
});

function close() {
  var comentDiv = this.parentElement.parentElement;
  comentDiv.style.display = 'none';
}