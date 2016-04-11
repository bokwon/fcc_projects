/**
 * Created by boyoung on 4/10/16.
 */
function moveSearchBox(){
  document.querySelector('.search-field').style.marginTop = 0 + 'px';
  document.querySelector('h2').style.fontSize = 14 + 'px';
  searchBox.removeEventListener('keypress', moveSearchBox);
}

function getResult(){
  var xhr = new XMLHttpRequest();
  var search = document.getElementById('searchBox').value || '';
  var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + search + '&format=json';
  xhr.open('GET', url);

  xhr.setRequestHeader('Accept', 'application/json');

  if(!xhr){
    console.log('Can not create an XMLHTTP instance');
    return false;
  }

  xhr.addEventListener('readystatechange', function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        var obj = JSON.parse(xhr.responseText);
        showResult(obj);
      }else{
        console.log('Error: ' + xhr);
      }
    }
  });

  xhr.send();
}

function showResult(data){
  var result = document.querySelector('.result');
  if ( result.hasChildNodes() ) { 
    result.removeChild( result.childNodes[0] );
  }
  var list = document.createElement("ul");
  if(data[0] === ""){
    result.innerHTML = "";
  }else if(data[1].length === 0){
    var elem = document.createElement("p");
    elem.innerText = 'There is no wikipedia page for "' + data[0] + '". Try other search!';
    result.appendChild(elem);
  }else {
    var title = [];
    data[1].map(function(val){
      title.push(val);
    });

    var contentSnippet = [];
    data[2].map(function(val){
      contentSnippet.push(val);
    });

    var wikiLink = [];
    data[3].map(function(val){
      wikiLink.push(val);
    });

    title.map(function(cur, idx){
      var elem = document.createElement("li");
      var anchor = document.createElement("a");
      var snippet = document.createElement("p");

      anchor.href= wikiLink[idx];
      anchor.innerText = cur;
      anchor.target = "_blank";
      snippet.innerText = contentSnippet[idx];

      elem.appendChild(anchor);
      elem.appendChild(snippet);

      list.appendChild(elem);
    });

    result.appendChild(list);
  }
}

