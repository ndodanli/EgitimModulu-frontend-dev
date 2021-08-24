//index.html'de tanımlanmış id'si scripts olan div elementinin içerisine gönderilen scriptleri yaz
const setScripts = (scriptSources) => {
  const scriptsDiv = document.getElementById("scripts");
  const scripts = [];

  for (let i = 0; i < scriptSources.length; i++) {
    if(checkIfExist(scriptSources[i], scriptsDiv)) continue;
    scripts[i] = document.createElement("script");
    scripts[i].src = scriptSources[i];
    scripts[i].async = false;
    scriptsDiv.appendChild(scripts[i]);
  }
  document.body.appendChild(scriptsDiv);
};

const checkIfExist = (scriptSource, scriptsDiv) => {
  const scriptsDivChilds = scriptsDiv.children;
  for (var i = 0; i < scriptsDivChilds.length; i++) {
    if (scriptsDivChilds[i].src.includes(scriptSource)) return true;
  }
  return false;
};

//yazılan scriptleri kaldır
const removeScripts = () => {
  const scriptsDiv = document.getElementById("scripts");
  document.body.removeChild(scriptsDiv);
};

export { setScripts, removeScripts };
