import "./socket-front-index.js"

const listedDocuments = document.getElementById("lista-documentos");

function addDocumentListing(documentName) {
    listedDocuments.innerHTML += `
        <a
          href="document?name=${documentName}"
          class="list-group-item list-group-item-action"
        >
          ${documentName}
        </a>
    `
}

export { addDocumentListing }