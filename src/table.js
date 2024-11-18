const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
}

export const createTable = (columnsArray, dataArray, tableId) => {
  if (
    !isNonEmptyArray(columnsArray) || 
    !isNonEmptyArray(dataArray) || 
    !tableId
  ) {
    throw new Error('Para a correta execução, precisamos de um array com as colunas, outro com as informações das linhas e também o id do elemento tabela selecionado'

    );
  }
  const tableElment = document.getElementById(tableId)
  if (!tableElment || tableElment.nodeName !== 'TABLE') {
    throw new Error ('Id informado não corresponde a nenhum elemento table');

  }
  createTableHeader(tableElment, columnsArray);
  createTableBody(tableElment, dataArray, columnsArray);
};

//função que gera cabeçalho da tabela
function createTableHeader(tableReference, columnsArray) {
  //<table></table>  || <table><thead></thead></table>
  function createTheadElement(tableReference) {
    const thead = document.createElement('thead');//<thead></thead>
    tableReference.appendChild(thead);//<table><thead></thead></table>
    return thead;
  }
  const tableHeeaderReference = tableReference.querySelector('thead') ?? createTheadElement(tableReference);
  //<table><thead></thead></table>
  const headerRow = document.createElement('tr');//<tr></tr>
  ['bg-blue-900', 'text-slate-200', 'sticky', 'top-6'].forEach(cssClass => headerRow.classList.add(cssClass))//cor no cabeçalho da tabela
  //<tr><th></th></tr>
  for (const tableColumnObject of columnsArray) {
    const headerElement = /*html*/`<th class='text-center'>${tableColumnObject.columnLabel}</th>`;
    headerRow.innerHTML += headerElement;
  }
  //<tr><th class='text-center'>Nome da coluna</th></tr>
  tableHeeaderReference.appendChild(headerRow);

}

function createTableBody(tableReference, tableItems, columnsArray) {
  function createTbodyElement(tableReference) {
    const tbody = document.createElement('tbody');
    tableReference.appendChild(tbody);
    return tbody;
  }
  const tableBodyReference = tableReference.querySelector('tbody') ?? createTbodyElement(tableReference);

  for (const [itemIndex, tableItem] of tableItems.entries()){
    const tableRow = document.createElement('tr');
    if (itemIndex % 2 !== 0) {
      tableRow.classList.add('bg-blue-200')
    }
    for (const tableColumn of columnsArray) {
      const formatFn = tableColumn.format ?? ((info) => info);
      tableRow.innerHTML += /*html*/`<td class='text-center'>${formatFn(tableItem[tableColumn.accessor])}</td>`;
    }
    tableBodyReference.appendChild(tableRow);
  }
};