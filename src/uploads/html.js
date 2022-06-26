const Html = ({ body, styles, title }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
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
`

export default Html
