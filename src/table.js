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
  createTableBody(tableReference, dataArray, columnsArray);
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
  const headerRow = document.createElement('tr') //<tr></tr>
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

  for (const [itemsIndex, tableItem] of tableItems.entries()){
    const tableRow = document.createElement('tr');

    for (const tableColumn of columnsArray) {
      tableRow.innerHTML += /*html*/`<td class='text-center'>${tableItem[tableColumn.accessor]}</td>`;
    }
    tableBodyReference.appendChild(tableRow);
  }
};