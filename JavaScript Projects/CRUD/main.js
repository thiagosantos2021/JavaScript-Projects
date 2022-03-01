'use strict'

const openModal = () => document.getElementById('modal').classList.add('active');
const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_cliente')) ?? [];
const setLocalStorage = (dbCliente) => localStorage.setItem('db_cliente', JSON.stringify(dbCliente));
//CRUD - Create, Read, Update, Delete
const createCliente = (cliente) => {
    const dbCliente = getLocalStorage();
    dbCliente.push(cliente);
    setLocalStorage(dbCliente);
}

const readCliente = () => getLocalStorage();

const updateCliente = (index, cliente) => {
    const dbCliente = readCliente();
    dbCliente[index] = cliente;
    setLocalStorage(dbCliente);
}

const deleteCliente = (index) => {
    const dbCliente = readCliente();
    dbCliente.splice(index, 1);
    setLocalStorage(dbCliente);
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}
//interação com o layout
const clearFields = () =>{
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = '');
}
const salvarCliente = () => {
    if (isValidFields()) {
        const cliente = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index;
        if (index == 'new') {
            createCliente(cliente);
            updateTable();
            closeModal();
        }else{
            updateCliente(index, cliente);
            updateTable();
            closeModal();
        }  
    }
}

const createRow = (cliente, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>${cliente.nome}</td>
    <td>${cliente.email}</td>
    <td>${cliente.celular}</td>
    <td>${cliente.cidade}</td>
    <td>
        <button type="button" class="button green" id="edit-${index}">Editar</button>
        <button type="button" class="button red" id="delete-${index}">Excluir</button>
    </td>
    `
    document.querySelector('#tbCliente>tbody').appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tbCliente>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}
const updateTable = () => {
    const dbCliente = readCliente();
    clearTable();
    dbCliente.forEach(createRow);
}

const editCliente = (index) => {
    const cliente = readCliente()[index];
    cliente.index = index;
    preencherCampos(cliente);
    openModal();
}

const preencherCampos = (cliente) => {
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('email').value = cliente.email;
    document.getElementById('celular').value = cliente.celular;
    document.getElementById('cidade').value = cliente.cidade;
    document.getElementById('nome').dataset.index = cliente.index;
}

const EditDelete = (event) => {
    if (event.target.type === 'button') {
        const [action, index] = event.target.id.split('-');
        if (action === 'edit') {
            editCliente(index);
        }else{
            const cliente = readCliente()[index];
            const response = confirm(`Deseja realmente excluir o cliente ${cliente.nome}?`);
            if (response) {
                deleteCliente(index);
                updateTable();
            }
        }
    }
}

updateTable();

//Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('salvar').addEventListener('click', salvarCliente);
document.querySelector('#tbCliente>tbody').addEventListener('click', EditDelete);