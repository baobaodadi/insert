import 'babel-polyfill';import 'bootstrap';import 'bootstrap-validator'const is_IE = function (ver) {  const b = document.createElement('b');  b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->';  return b.getElementsByTagName('i').length === 1;};if (is_IE(5) || is_IE(6) || is_IE(7) || is_IE(8)||is_IE(9)) {  window.location.href='/browser.html';}