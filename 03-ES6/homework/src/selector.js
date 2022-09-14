var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchen en resultSet
  // usa matchFunc para identificar elementos que matchen

  // TU CÓDIGO AQUÍ
    if(matchFunc(startEl)) resultSet.push(startEl);

    for (let i = 0; i<startEl.children.length; i++){
      let child = startEl.children[i];
      let found = traverseDomAndCollectElements(matchFunc, child);
      resultSet = [...resultSet, ...found]
    }
    
    return resultSet
    // //if (startEl.children) startEl.children.traverseDomAndCollectElements(matchFunc, startEl.children);
    // if (startEl.previousElementSibling) startEl.previousElementSibling.traverseDomAndCollectElements(matchFunc, startEl.previousElementSibling);
    // if (startEl.nextElementSibling) startEl.nextElementSibling.traverseDomAndCollectElements(matchFunc, startEl.nextElementSibling);
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí
  if (selector[0] === '#') return 'id';
  else if (selector [0] === '.') return 'class';
  else if (selector.includes('>')) return "tag.children";
  else if (selector.includes(' ')) return 'tag.descendant';
  else if (selector[0] !== '#' && selector[0] !== '.' && selector.includes('.')) return 'tag.class';
  else return 'tag';
};

`selectorTypeMatcher`
// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.
                                    //'div img'
var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector); //tag.descendant
  //matchFunction debe checkear si un elemento matchea con el selector que el usuario quiere
  var matchFunction;
  if (selectorType === "id") { 
   matchFunction = function (el){
    let cleanSelector = selector.slice(1);
    return el.id === cleanSelector;
   }
  } else if (selectorType === "class") {
    matchFunction = function (el){
      let cleanSelector = selector.slice(1);
       if(el.classList.contains(cleanSelector)) return true;
       return false;
    }
  } else if (selectorType === "tag.class") {
    matchFunction = function (el){
      let cleanSelector = selector.split('.');
      let firstProp = cleanSelector[0].toString();
      let scndProp = cleanSelector[1].toString();
      if (el.tagName.toLowerCase() === firstProp.toLowerCase() && el.classList.contains(scndProp)) return true;
      return false;
    }
  } else if (selectorType === "tag") {
   matchFunction = function (el) {
    if (el.tagName && (el.tagName.toLowerCase() === selector.toLowerCase())) return true;
   }
  } else if (selectorType === 'tag.children'){
    matchFunction = function (el) {
      let cleanParent = selector.split(' > ')[0]; //div
      let cleanChild = selector.split(' > ')[1]; //img
      if (el.tagName.toLowerCase() === cleanChild && el.parentElement.tagName.toLowerCase() === cleanParent) return true;
      return false;
    }
  } else if (selectorType === 'tag.descendant'){
    matchFunction = function (el) {
      let cleanParent = selector.split(' ')[0]; //div
      let cleanChild = selector.split(' ')[1]; //img
      if  (el.tagName.toLowerCase() === cleanChild && el.parentElement.tagName.toLowerCase() === cleanParent) return true;
      return false;
    }
  }
  return matchFunction;
};
                  //'div img'
var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};

`matchFunctionMaker`