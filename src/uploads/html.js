const Html = ({ body, styles, title }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css" integrity="sha512-IJEbgDEF7OeKJRa0MY2PApnyJHRIsgzCveek4ec8VWQ+7KG3ZSKVNYa5xP/Gh0hVP0Mwb+gBsk+GwR3JQGhQNg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <style>
        html,body, #app{
          width:100%;
          height:100%;
        }
      </style>
      ${styles}
    </head>
    <body>
      <div id="app">${body}</div>
    </body>
  </html>
`;

export default Html
