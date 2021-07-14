import React, { Component } from "react"
import "./Modal.css"
import Modal from "@material-ui/core/Modal"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import { connect } from "react-redux"
import Typography from "@material-ui/core/Typography"
import { EMPTY } from "../../Common/CommonConstants"

class ModalComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: this.props.modalOpen,
    }
  }


  bodyRender = () => {
    return (
      <div className="modalStyle">
        <Card className="rootModalCard">
          <CardMedia
            className="mediaModal"
            image={this.props.image}
            title="Modal Image"
          />
          <CardContent>
            <Typography
              className="profileInfoText"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {this.props.page === "profile" ? <div>Welcome {this.props.username} !</div> : EMPTY}
              {this.props.message}
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }

  handleClose = () => {
    this.setState({
      modalOpen: false,
    })
    this.props.updateModalState(!this.state.modalOpen)
  }


  render() {
    return (
      <div>
        <Modal
          open={this.state.modalOpen}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {this.bodyRender()}
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.common.username,
  }
}

export default connect(mapStateToProps, null)(ModalComponent)
