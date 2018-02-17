const css = String.raw

export const color = {
  primary: '#3897f0',

  backgroundLight: '#fafafa',
  backgroundWhite: '#fff',

  text: '#262626',
  textLight: '#999',

  border: '#efefef',
  borderDark: '#e6e6e6',
}

export const font = {
  formElement: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
}

export const globalStyles = css`
  html, body {
    font-size: 10px;
    font-family: ${font.formElement};
    -webkit-font-smoothing: antialiased;
    margin: 0;
    padding: 0;
    background-color: #fafafa;
  }

  a {
    text-decoration: none;
    color: #003569;
  }
  a:visited, a:focus, a:active {
    color: #003569;
  }

  * {
    box-sizing: border-box;
  }
`
