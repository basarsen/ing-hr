import { LitElement, html } from 'lit';
import { store } from '../redux/store'
import { state } from 'lit/decorators.js';
import { sharedStyles } from '../shared-css';
import { Employee } from '../models/employee';
import { translate as t } from 'lit-i18n'
import { updateEmployee } from '../redux/app.slice';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import i18next from 'i18next'

export class EmployeeDetailView extends LitElement {

    @state()
    user: Employee

    firstUpdated(): void {
        // @ts-ignore
        super.firstUpdated()
        this.user = store.getState().appSettings.data.find(i => i.id === location.pathname.split('/employee/')[1]) as Employee
    }

    constructor() {
        super();
        this.user = {} as Employee
    }

    onSubmit(e: FormDataEvent) {
        e.preventDefault()
        store.dispatch(updateEmployee(this.user))
        Toastify({
            text: i18next.language === 'tr' ? 'Güncellendi' : 'Updated',
            duration: 5000,
            newWindow: true,
            gravity: "top",
            position: "right",
        }).showToast();
        window.history.go(-1)
    }

    handleInputChange(event: any) {
        const { name, value } = event.target;
        this.user = { ...this.user, [name]: value };
    }

    render() {
        return html`
        <div class="container">
        <h1 class="page-title">${t('global.updateEmployee')}</h1>
            <form @submit="${this.onSubmit}">
                <p>${t('employeesTable.firstName')}</p>
                <input 
                    name="firstName"
                    .value="${this.user.firstName}"  
                    @input="${this.handleInputChange}" 
                    required />
                <p>${t('employeesTable.lastName')}</p>
                <input 
                    name="lastName" 
                    .value="${this.user.lastName}" 
                    @input="${this.handleInputChange}" 
                    required/>
                <p>${t('employeesTable.dateOfEmployment')}</p>
                <input 
                    type="date"
                    name="dateOfEmployment"
                    .value="${this.user.dateOfEmployment}" 
                    @input="${this.handleInputChange}" 
                    required/>
                <p>${t('employeesTable.dateOfBirth')}</p>
                <input 
                    type="date"
                    name="dateOfBirth"
                    .value="${this.user.dateOfBirth}" 
                    @input="${this.handleInputChange}" 
                    required/>
                <p>${t('employeesTable.phone')}</p>
                <input 
                    name="phone"
                    .value="${this.user.phone}" 
                    @input="${this.handleInputChange}" 
                    required/>
                <p>${t('employeesTable.email')}</p>
                <input 
                    name="email"
                    .value="${this.user.email}" 
                    @input="${this.handleInputChange}" 
                    required/>
                <p>${t('employeesTable.department')}</p>
                <select 
                    name="department"
                    .value="${this.user.department}" 
                    @input="${this.handleInputChange}" 
                    required>
                    <option value="Analytics">Analytics</option>
                    <option value="Tech">Tech</option>
                </select>
                <p>${t('employeesTable.position')}</p>
                <select 
                    name="position"
                    .value="${this.user.position}" 
                    @input="${this.handleInputChange}" 
                    required>
                    <option value="Junior">Junior</option>
                    <option value="Medior">Medior</option>
                    <option value="Senior">Senior</option>
                </select>
                <br>
                <button class="btn primary">${t('global.update')}</button>
            </form>
        </div>
      `;
    }



    static get styles() {
        return [
            sharedStyles
        ]
    }
}
customElements.define('employee-detail-view', EmployeeDetailView);