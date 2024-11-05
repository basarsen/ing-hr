import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { sharedStyles } from "../shared-css";
import ingLogo from '../assets/ing-logo.png'
import addNew from '../assets/add.png'
import people from '../assets/people.png'
import { translate as t } from 'lit-i18n'
import i18next from 'i18next'


@customElement('ing-header')
export class IngHeader extends LitElement {
    @state() language = i18next.language;

    changeLanguage() {
        const currentLanguage = i18next.language
        this.language = currentLanguage
        i18next.changeLanguage(currentLanguage === 'en' ? 'tr' : 'en')
    }

    render() {
        return html
            `<div id="header">
                <div class="container fx spc-btw align-center"> 
                    <a href="/"><img id="logo" src="${ingLogo}"/></a>
                    <div id="action-buttons">
                        <a href="/employees" class="btn-action"><img src="${people}"/>${t('header.btnEmployees')}</a>
                        <a href="/new-employee" class="btn-action"><img src="${addNew}"/>${t('header.btnAddNew')}</a>
                        <span class="btn-action lang" @click="${this.changeLanguage}">${t('global.language')}</span>
                    </div>
                </div>
            </div>`
    }

    static get styles() {
        return [
            sharedStyles,
            css`
            #header {
            position: fixed;
            top:0;
            left: 0;
            padding: 16px 0;
            width: 100%;
            background-color: #fff;
            }
            .header-inner {
                width: 1200px;
                margin: 0 auto;
            }
            #logo {
                width: 80px;
            }
            .btn-action {
                font-size: 12px;
                display: flex;
                align-items: center;
                transition: .3s cubic-bezier(0.39, 0.575, 0.565, 1);
                color:  #ff6101;
            }
            .btn-action:hover {
                transform: scale(0.9)
            }
            .btn-action img {
                width: 16px;
                display: inline-block;
                margin-right: 4px;
            }
            #action-buttons {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .lang {
                color: #ff6101;
                font-weight: 500;
                border: 1px solid #ff6101;
                padding: 4px;
                cursor: pointer;
            }
            @media screen and (max-width: 768px) {
                #header {
                    padding: 16px;
                }
            }
            `
        ]
    }

}


