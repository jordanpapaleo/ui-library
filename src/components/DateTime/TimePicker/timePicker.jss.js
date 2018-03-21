const input = {
  border: 'none',
  outline: 'none',
  maxWidth: 22
}

export const jssStyles = {
  container: {
    border: '1px solid #d2d7db',
    display: 'inline-block',
    marginBottom: 15,
    padding: '6px 10px'
  },
  icon: {
    position: 'relative',
    top: 1,
    fonSize: 20,
    marginRight: 10
  },
  input: {
    ...input
  },
  minuteInput: {
    ...input,
    marginLeft: 4
  }
}
