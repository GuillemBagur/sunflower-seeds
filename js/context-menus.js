const textareasMenu = new CtxMenu(".text");

const callBackFunctionsTextareas = {
  "Copiar texto": copyText,
  "Pegar texto": pasteText,
  "Borrar texto": deleteText,
  "Importar texto": () => openPopup("import-text"),
  "Abrir historial": () => {}
};


// const speech use the specific func
// const openMenu use the specific func
// const importText use the specific func
// const openHistory use the specific func


for(let funcName in callBackFunctionsTextareas){
  const func = callBackFunctionsTextareas[funcName];
  textareasMenu.addItem(funcName, func);
}
