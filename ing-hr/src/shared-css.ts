import { css } from 'lit-element';

export const sharedStyles = css`
  * {
    box-sizing: border-box;
  }
  .container {
    width:1200px;
    margin: 0 auto;
  }
  .fx {
    display: flex;
  } 
  .spc-btw{
    justify-content: space-between
  }
  .align-center {
    align-items: center;
  }
  .justify-center {
    justify-content: center;
  }
  .fx-end {
    justify-content: flex-end
  }
  .full-width {
    width: 100%;
  }
  .bold {
    font-weight: bold;
  }
  .page-title {
    font-weight: 500;
    color: #ff6101;
    font-size: 20px;
    margin-bottom: 24px;
  }
  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }
  .btn {
    display: block;
    outline: none;
    border: 1px solid #111;
    border-radius: 4px;
    padding: 8px 24px;
    text-align: center;
    background: none;
    cursor: pointer;
    transition: .3s cubic-bezier(0.6, -0.28, 0.735, 0.045)
  }

  .btn.primary {
    background-color: #ff6101;
    color: #fff;
    border:0;
  }

  .btn:hover {
    transform: scale(.95)
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    display: table;
    width: 100%;
  }

  th {
    padding-bottom: 16px;
    font-weight: bold;
    color: #ff6101;
  }

  th:last-child {
    text-align: right;
  }

  td {
    padding: 16px 0;
    text-align: center;
  }

  td:last-child {
    text-align: right
  }
  
  td:first-child, th:first-child {
    text-align: left
  }

  tr {
    border-bottom: 1px solid #eee;
  }
  tr:hover {
    background-color: #f1f1f1;
  }
  input, 
  select 
  {
    font-family: inherit;
    font-weight: 300;
    padding: 6px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-width: 300px;
    margin-bottom: 16px;
  }
  form p{
    font-weight: 500;
  }
  @media screen and (max-width: 768px) {
    .container {
      width: 100%;
    }
    input,
    select {
      width: 100%;
    }
    td, th {
      padding: 16px 32px;
      text-align: center;
    }
    .btn {
      width: 100%;
    }
  }
  `;