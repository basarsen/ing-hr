import { LitElement, html, css } from 'lit';
import { translate as t } from 'lit-i18n';
import '../index.css'
import { sharedStyles } from '../shared-css';

export class Home extends LitElement {


  render() {
    return html` 
    <div class="container">
      <h1>${t('home.greeting')}</h1>
      <p>${t('home.showEmployees')}</p>
      </div>  
      `;
  }

  static get styles() {
    return [
      sharedStyles,
      css`
      h1{
        font-weight: 500;
        font-size: 24px;
      }
    `,
    ];
  }

}



customElements.define('home-view', Home);