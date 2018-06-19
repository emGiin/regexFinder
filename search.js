var regex = new RegExp('\\b' + query + '\\b', 'g');
// var regex2 = new RegExp('(\\b' + query + '\\b)', 'g');

var oldResults = document.getElementsByClassName('searchResults');
if (oldResults.length) unwrap(oldResults);

traverseDOM(document.body, function(node) {
  if (regex.test(node.data)) {
    wrapMatchesInNode(node);
  }
});

document.getElementsByClassName('searchResults').length;

/// FUNCTIONS 
function traverseDOM(el, fn) {
  for (var i = 0, len = el.childNodes.length; i < len; i++) {
    var node = el.childNodes[i];
    if (node.nodeType === 3) fn(node);
    else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT'  && !(node.tagName == "SPAN" && node.className == "searchResults") )
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

// traverseDOM(document.body, function(node) {
//   var text = node.data.split(regex2),
//     parent = node.parentNode,
//     newNode;

//   parent.insertBefore(textNode(text[0]), node);

//   for (var i = 1; i < text.length; i += 2) {
//     newNode = document.createElement('span');
//     newNode.className = 'searchResults';
//     newNode.style.cssText = 'background: salmon; padding:3px;';
//     newNode.innerText = text[i];
//     parent.insertBefore(newNode, node);
//     parent.insertBefore(textNode(text[i + 1]), node);
//   }
//   parent.removeChild(node);
// });

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
