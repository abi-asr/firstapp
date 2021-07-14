import React, { Component } from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogTitle from "@material-ui/core/DialogTitle"
import Button from "@material-ui/core/Button"
import { withRouter } from "react-router-dom"
import { CANCEL, OK, LOGOUT_INFO, LOGIN_PATH } from "../../Common/CommonConstants"
import { connect } from "react-redux"


class Popover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogOpen: this.props.dialogOpen,
    }
  }
  
  handleLogOut = () => this.props.history.push(LOGIN_PATH)

  handleDialogClose = () =>{
    this.setState({
      dialogOpen: false,
    })
    this.props.updatePopOverState(!this.state.dialogOpen)
  }
   

  render() {
    return (
      <div>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Hey {this.props.username}! {LOGOUT_INFO} 
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              {CANCEL}
            </Button>
            <Button onClick={this.handleLogOut} color="primary" autoFocus>
              {OK}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.common.username,
  }
}

export default withRouter(connect(mapStateToProps, null)(Popover))

