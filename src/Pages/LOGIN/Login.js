import React, { Component } from "react"
import { TextField, Button, IconButton } from "@material-ui/core"
import InstagramIcon from "@material-ui/icons/Instagram"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { username } from "../../action/commonAction"
import "./Login.css"
import { EMPTY, HOMEPATH, LOGIN } from "../../Common/CommonConstants"
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: EMPTY,
    }
  }

  // To handle user tries to login
  handleSubmit = () => {
    this.props.username(this.state.username)
    this.props.history.push(HOMEPATH)
  }

  handleUsername = (event) => {
    this.setState({
      username: event.target.value,
    })
  }

  render() {
    return (
      <div className="mainDiv">
        <IconButton color="inherit" aria-label="open drawer">
          <InstagramIcon className="LoginLogoIcon" />
        </IconButton>
        <br />
        <TextField
          id="standard-basic"
          label="Username"
          onChange={this.handleUsername}
        />
        <br />
        <TextField id="standard-search" label="Password" type="password" />
        <br />
        <Button
          onClick={this.handleSubmit}
          type="submit"
          className="loginBtn"
          variant="outlined"
          color="primary"
        >
          {LOGIN}
        </Button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    username: (data) => dispatch(username(data)),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Login))
