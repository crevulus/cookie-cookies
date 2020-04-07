const withContext = (Context) => (WrappedComponent) => (props) => {
  return (
    <Context.Consumer>
      {value => <WrappedComponent context={value} {...props}/>}
    </Context.Consumer>
  )
}
