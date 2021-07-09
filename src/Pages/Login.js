import React, { Component } from "react";
import { TextField, Button, IconButton } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import { withRouter } from "react-router-dom";
import './Login.css'
class Login extends Component {
  // To handle user tries to loginl
  handleSubmit = () => {
    this.props.history.push("/home");
  };

  render() {
    return (
      <div style={{ marginTop: "160px" }}>
        <IconButton color="inherit" aria-label="open drawer">
          <InstagramIcon className='LoginLogoIcon'/>
        </IconButton>
        <br />
        <TextField id="standard-basic" label="Username" />
        <br />
        <TextField id="standard-search" label="Password" type="password" />
        <br />
        <Button
          onClick={this.handleSubmit}
          type="submit"
          style={{ top: "20px" }}
          variant="outlined"
          color="primary"
        >
          Login
        </Button>
      </div>
    );
  }
}

export default withRouter(Login);
