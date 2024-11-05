import { LitElement, html, css } from 'lit'
import { store } from '../redux/store'
import { state } from 'lit/decorators.js'
import { sharedStyles } from '../shared-css'
import { Employee } from '../models/employee'
import { drop, take } from 'lodash'
import { translate as t } from 'lit-i18n'
import { changeDisplayType, removeEmployee } from '../redux/app.slice'
import moment from 'moment'
import grid from '../assets/grid.png'
import list from '../assets/list.png'
import editButton from '../assets/edit.png'
import trashButton from '../assets/trash.png'
import closeButton from '../assets/close.png'

export class EmployeesView extends LitElement {

  data = [] as Employee[]

  itemsPerPage = 12

  @state()
  dropIndex = 0

  @state()
  currentPage = 1

  @state()
  modalVisible = false

  @state()
  selectedEmployee = {} as Employee

  @state()
  displayType = 'table'

  onDropIndexChanged(page: number) {
    this.dropIndex = (page - 1) * this.itemsPerPage
    this.currentPage = page
  }

  nextPage() {
    if (this.currentPage === Math.ceil(this.data.length / this.itemsPerPage)) return
    this.currentPage += 1
    this.dropIndex = (this.currentPage - 1) * this.itemsPerPage
  }

  prevPage() {
    if (this.currentPage === 1) return;
    this.currentPage -= 1
    this.dropIndex = (this.currentPage - 1) * this.itemsPerPage
  }

  unsubscribe

  constructor() {
    super();
    this.data = store.getState().appSettings.data
    this.unsubscribe = store.subscribe(() => {
      this.data = store.getState().appSettings.data
      this.displayType = store.getState().appSettings.displayType
      this.requestUpdate();
    });
  }

  onConfirm(employee: Employee) {
    this.selectedEmployee = employee
    this.modalVisible = true
  }

  onRemove() {
    store.dispatch(removeEmployee(this.selectedEmployee.id))
    this.modalVisible = false
  }

  onChangeDisplayType(displayType: 'table' | 'grid') {
    store.dispatch(changeDisplayType(displayType))
  }

  render() {
    return html`
    <div class="container fx fx-end align-center" id="layout-options">
        <a href="javascript:" class="btn-layout" @click="${() => this.onChangeDisplayType("table")}"><img src="${list}"/></a>
        <a href="javascript:" class="btn-layout" @click="${() => this.onChangeDisplayType("grid")}"><img src="${grid}"/></a>
      </div>
    ${store.getState().appSettings.displayType === 'table' ?
        html`
      <div class="container">
        <div class="table-container">
            <table>
              <thead>
                  <th>${t('employeesTable.firstName')}</th>
                  <th>${t('employeesTable.lastName')}</th>
                  <th>${t('employeesTable.dateOfEmployment')}</th>
                  <th>${t('employeesTable.dateOfBirth')}</th>
                  <th>${t('employeesTable.phone')}</th>
                  <th>${t('employeesTable.email')}</th>
                  <th>${t('employeesTable.department')}</th>
                  <th>${t('employeesTable.position')}</th>
                  <th>${t('employeesTable.actions')}</th>
              </thead>
              <tbody>
              ${take(drop(this.data, this.dropIndex), this.itemsPerPage).map((obj) =>
          html`
                  <tr>
                    <td class="bold">${obj.firstName}</td>
                    <td class="bold">${obj.lastName}</td>
                    <td>${moment(obj.dateOfEmployment).format('DD/MM/YYYY')}</td>
                    <td>${moment(obj.dateOfBirth).format('DD/MM/YYYY')}</td>
                    <td>${obj.phone}</td>
                    <td>${obj.email}</td>
                    <td>${obj.department}</td>
                    <td>${obj.position}</td>
                    <td class="actions"><a href="/employee/${obj.id}"><img src="${editButton}"></a><a href="javascript:"><img @click="${() => this.onConfirm(obj)}" src="${trashButton}" /></a></td>
                  </tr>`
        )}
            </tbody>
          </table>
          </div>
      </div>
          `:
        html`
        <div class="container">
        <div class="grid-container">
         ${take(drop(this.data, this.dropIndex), this.itemsPerPage).map((obj) =>
          html`
          <a href="/employee/${obj.id}" class="grid-item">
            <p class="bold">${obj.firstName} ${obj.lastName}</p>
            <p class="grid-title">${t('employeesTable.dateOfEmployment')}</p>
            <p>${moment(obj.dateOfEmployment).format('DD/MM/YYYY')}</p>
            <p class="grid-title">${t('employeesTable.dateOfBirth')}</p>
            <p>${moment(obj.dateOfBirth).format('DD/MM/YYYY')}</p>
            <p class="grid-title">${t('employeesTable.phone')}</p>
            <p>${obj.phone}</p>
            <p class="grid-title">${t('employeesTable.email')}</p>
            <p>${obj.email}</p>
            <p class="grid-title">${t('employeesTable.department')}</p>
            <p>${obj.department}</p>
            <p class="grid-title">${t('employeesTable.position')}</p>
            <p>${obj.position}</p>
          </a>
          `)}
    </div>
</div>
        `
      }
      <div class="pagination fx">
        <ul>
          <li @click="${this.prevPage}"><</li>
      ${[...Array(Math.ceil(this.data.length / this.itemsPerPage)).keys()].map((_, index) =>
        html`<li class=${this.currentPage === index + 1 && 'active'} @click="${() => this.onDropIndexChanged(index + 1)}">${index + 1}</li>`
      )}  <li @click="${this.nextPage}">></li>
        </ul>
      </div>
      
    </div>
    ${this.modalVisible ? html`
    <div class="remove-modal fx align-center justify-center">
      <div class="modal-body">
        <div class="fx spc-btw align-center">
        <h5>Are you sure?</h5>
        <img id="btn-close" src="${closeButton}" @click="${() => this.modalVisible = false}"/>
        </div>
        <p>Selected Employee record of ${this.selectedEmployee.firstName}  ${this.selectedEmployee.lastName} will be deleted</p>
        <button class="btn primary full-width" style="margin-bottom: 4px;" @click="${this.onRemove}">Proceed</button>
        <button class="btn full-width" @click="${() => this.modalVisible = false}">Cancel</button>
      </div>
    </div>    
    `: null}
      `;
  }

  static get styles() {
    return [
      sharedStyles,
      css`
          .btn-layout img{
            width: 20px;
            margin-left: 12px;
          }
          #layout-options {
            padding: 24px 0;
          }
          .actions a {
            padding: 4px;
          }
          .actions img {
            width: 16px;
          }
          .pagination {
            justify-content: center;
            margin: 16px 0;
          }
          .pagination li {
            display: inline-block;
            width: 32px;
            height: 32px;
            line-height: 32px;
            border-radius: 50%;
            cursor: pointer;
            text-align: center;
          }
          .pagination li.active {
            background-color: #fe6202;
            color: #fff;
          }
          .remove-modal {
            position: fixed;
            top:0;
            left:0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.75);
            z-index: 2
          }
          .modal-body {
            background-color: #fff;
            padding: 8px;
            box-shadow: 0 0 32px #111;
          }
          .modal-body h5 {
            color: #ff6101;
            font-weight: bold;
          }
          .modal-body p {
            margin: 16px 0
          }
          #btn-close {
            cursor: pointer;
            width: 16px;
          }
          .grid-container {
            display: grid;
            grid-template-columns: auto auto auto auto;
            background-color: #fbfbfb;
            gap: 10px;
        }
          .grid-item {
              background-color: rgba(255, 255, 255, 0.8);
              padding: 16px;
              text-align: center;
              box-shadow: 0 0 16px #eee;
          }
          .grid-title {
            font-weight: bold;
            font-size: 12px;
            color: #ff6101;
            margin-top: 8px;
          }
          .table-container {
            min-width: 100%;
            overflow-x: auto
          }
          @media screen and (max-width: 768px) {
              .grid-container {
            grid-template-columns: auto auto;
              }
          }
          @media screen and (max-width: 480px) {
              .grid-container {
            grid-template-columns: auto;
             }
          }
        `
    ]
  }
}
customElements.define('employees-view', EmployeesView);