
import { LitElement, html } from 'lit'
import { Router } from '@vaadin/router'
import i18next from 'i18next'
import { initLitI18n } from 'lit-i18n'
import './pages/home-view.ts'
import './pages/about-view.ts'
import './pages/employees-view.ts'
import './pages/employee-detail-view.ts'
import './pages/new-employee-view.ts'
import './components/header.ts'
import en from './i18n/en.json'
import tr from './i18n/tr.json'

i18next.use(initLitI18n).init({
    lng: document.documentElement.lang || 'en',
    resources: {
        en,
        tr
    },
});

export class RoutingWithLit extends LitElement {
    firstUpdated() {
        if (this.shadowRoot) {
            const router = new Router(this.shadowRoot.querySelector('#outlet'));
            router.setRoutes([
                { path: '/', component: 'home-view' },
                { path: '/new-employee', component: 'new-employee' },
                { path: '/employees', component: 'employees-view' },
                { path: '/employee/:id', component: 'employee-detail-view' },
                { path: '/about', component: 'about-view' },
                { path: '(.*)', redirect: '/' },
            ]);
        }
    }

    render() {
        return html`
        <ing-header></ing-header>
        <main>
            <div id="outlet"></div>
        </main>
    `;
    }
}