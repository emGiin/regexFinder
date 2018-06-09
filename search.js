var regex = new RegExp('\\b' + query + '\\b', 'g');

var oldResults = document.getElementsByClassName('searchResults');
if (oldResults.length) unwrap(oldResults);

traverseDOM(document.body, function(node) {
  if (regex.test(node.data)) {
    wrapMatchesInNode(node);
  }
});

function traverseDOM(el, fn) {
  for (var i = 0, len = el.childNodes.length; i < len; i++) {
    var node = el.childNodes[i];
    if (node.nodeType === 3) fn(node);
    else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT')
      traverseDOM(node, fn);
  }
}

function textNode(txt) {
  return document.createTextNode(txt);
}

function wrapMatchesInNode(textNode) {
  var temp = document.createElement('div');

  temp.innerHTML = textNode.data.replace(
    regex,
    matched =>
      '<span class="searchResults" style="background: salmon; padding:3px;">' +
      matched +
      '</span>'
  );

  while (temp.firstChild) {
    textNode.parentNode.insertBefore(temp.firstChild, textNode);
  }
  textNode.parentNode.removeChild(textNode);
}

function unwrap(wrappers) {
  Array.from(wrappers).forEach(function(wrapper) {
    var docFrag = document.createDocumentFragment();
    while (wrapper.firstChild) {
      var child = wrapper.removeChild(wrapper.firstChild);
      docFrag.appendChild(child);
    }
    wrapper.parentNode.replaceChild(docFrag, wrapper);
  });
}
