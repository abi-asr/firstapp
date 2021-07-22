import React, { Component } from "react"
import { connect } from "react-redux"
import "./Modal.css"
import Modal from "@material-ui/core/Modal"
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { newsFeedList } from "../../action/commonAction"
import { ADD_POSTS, EMPTY, EXCLAMATION, POST, PROFILE, WELCOME } from "../../Common/CommonConstants"

let myObj = {},
newsFeedPostArrayList=[]
//This Class is used for showing Modal to the pages 
class ModalComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: this.props.modalOpen,
      selectedFile: null,
      selectedTitle: '',
      selectedDescription: '',
      selectedAvatarFile: '',
      filename: '',
      avatarFilename:''
    }
  }
  // On file select (from the pop up)
  onFileChange = event => {
    if (event.target.files && event.target.files[0])
      this.setState({
        selectedFile: URL.createObjectURL(event.target.files[0]),
        filename: event.target.files[0].name
      });
  }
  // On title select from the modal
  handleTitleChange = event => {
    if (event.target.value)
      this.setState({
        selectedTitle: event.target.value
      });
  }
  // On Description select from the modal
  handleDescriptionChange = event => {
    if (event.target.value)
      this.setState({
        selectedDescription: event.target.value
      });
  }
  // On avatar letter select from the modal
  handleAvatarChange = event => {
    if (event.target.files && event.target.files[0])
    this.setState({
      selectedAvatarFile: URL.createObjectURL(event.target.files[0]),
      avatarFilename: event.target.files[0].name
    });
  }

  // On file upload (click the upload button)
  onFileUpload = () => {
    myObj = {
      id: this.props.increment,
      title: this.state.selectedTitle,
      owner: this.props.username,
      avatar:this.state.selectedAvatarFile,
      description: this.state.selectedDescription,
      image: this.state.selectedFile,
      likedStatus: false,
      savedStatus: false
    }
    this.setState({
      selectedFile: myObj
    })
    newsFeedPostArrayList.push(myObj)
    this.setState({
      modalOpen: false
    })
    this.props.updateModalState(!this.state.modalOpen)
    this.props.newsFeedList(myObj)
  }

  //used to render modal body content
  bodyRender = () => {
    return (this.props.page === ADD_POSTS ?
      <div className="modalStyle"  >
        <div className="modalAddPostDiv">
          <TextField id="standard-basic" label="title" onChange={this.handleTitleChange} /><br />
          <TextField id="standard-basic" label="description" onChange={this.handleDescriptionChange} /><br />
          {this.state.filename ? <TextField id="standard-basic" label="post image" value={this.state.filename} />
            : <TextField id="standard-basic" label="post image" value={this.state.filename} />}
          <input accept="image/*" className="inputUpload" id="icon-button-file post" type="file" onChange={this.onFileChange} />
          <label htmlFor="icon-button-file post">
            <IconButton className="cameraBtn" color="primary" aria-label="upload picture post" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          <br />
          {this.state.avatarFilename ? <TextField id="standard-basic" label="avatar image" value={this.state.avatarFilename} />
            : <TextField id="standard-basic" label="avatar image" value={this.state.avatarFilename} />}
          <input accept="image/*" className="inputUpload" id="icon-button-file" type="file" onChange={this.handleAvatarChange} />
          <label htmlFor="icon-button-file">
            <IconButton className="cameraBtn" color="primary" aria-label="upload picture avatar" component="span">
              <PhotoCamera />
            </IconButton>
          </label><br />
          <Button
            variant="contained"
            color="default"
            className="uploadBtn"
            onClick={this.onFileUpload}
            startIcon={<CloudUploadIcon />} >
            {POST}
          </Button>
        </div>
      </div>
      : <div className="modalStyle"  >
        <Card className="rootModalCard">
          <CardMedia
            className="mediaModal"
            image={this.props.image}
            title="Modal Image" />
          <CardContent>
            <Typography
              className="profileInfoText"
              variant="body2"
              color="textSecondary"
              component="p" >
              {this.props.page === PROFILE ? <div>{WELCOME}{this.props.username}{EXCLAMATION}</div> : EMPTY}
              {this.props.message}
            </Typography>
          </CardContent>
        </Card>
      </div>
    )
  }
  //used to handle closing the modal 
  handleClose = () => {
    this.setState({
      modalOpen: false
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
          aria-describedby="simple-modal-description">
          {this.bodyRender()}
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    //getting username while login from store
    username: state.common.username,
    increment:state.common.increment
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //dispatching saved to set the data to store
    newsFeedList: (data) => dispatch(newsFeedList(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent)
