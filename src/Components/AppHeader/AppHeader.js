import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import Badge from "@material-ui/core/Badge"
import InstagramIcon from "@material-ui/icons/Instagram"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MailIcon from "@material-ui/icons/Mail"
import Button from "@material-ui/core/Button"
import NotificationsIcon from "@material-ui/icons/Notifications"
import celebrate from "../../assets/celebrate.png"
import pageUnderConstruction from "../../assets/pageUnderConstruction.jpg"
import messagePageConstruction from "../../assets/messagePageConstruction.jpg"
import {
    EMPTY,
    HOME,
    HOMEPAGE,
    HOMEPATH,
    INSTAGRAM,
    LOGOUT,
    MESSAGE,
    MESSAGE_INFO,
    NOTIFICATION,
    NOTIFICATION_INFO,
    PROFILE,
    PROFILE_INFO,
    SAVED_ITEMS,
    SAVEPATH,
} from "../../Common/CommonConstants"
import Popover from "../../Components/Popover/Popover"
import ModalComponent from "../../Components/Modal/ModalComponent"
import './AppHeader.css'

let modalMessage = EMPTY,
    modalImage = EMPTY,
    modalPage = EMPTY
//This Class is used for showing Header bar to the pages 
class AppHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchor: false,
            anchorEl: null,
            dialogOpen: false,
            modalOpen: false,
            liked: false,
        }
    }

    //used to open the menu items to display profile, logout..
    handleDialogOpen = () =>
        this.setState({
            dialogOpen: true,
            anchorEl: null,
        })
    //used to open popover for logout
    openPopOver = (event) =>
        this.setState({
            anchorEl: event.currentTarget,
        })
    //used to close popover for logout
    popOverClose = () => {
        this.setState({
            anchorEl: null,
            dialogOpen:false,
            modalOpen:false
        })
        
    }
    //used to open profile modal
    handleProfile = () => {
        this.setState({ modalOpen: true })
        modalMessage = PROFILE_INFO
        modalImage = celebrate
        modalPage = PROFILE
    }
    //used to open notification modal
    handleNotificationIcon = () => {
        this.setState({ modalOpen: true })
        modalMessage = NOTIFICATION_INFO
        modalImage = pageUnderConstruction
        modalPage = NOTIFICATION
    }
    //used to open messgae modal
    handleMessageIcon = () => {
        this.setState({ modalOpen: true })
        modalMessage = MESSAGE_INFO
        modalImage = messagePageConstruction
        modalPage = MESSAGE
    }
    //used to update modal state to false from child
    updateModalState = (modalOpenFromChild) => this.setState({ modalOpen: modalOpenFromChild })
    //used to update popover state to false from child
    handleUpdatePopoverState = (dialogOpenFromChild) => this.setState({ dialogOpen: dialogOpenFromChild })
    //used to handle saved items from menu list
    handleSavedItems = () => this.props.history.push(SAVEPATH)
    //used to handle Home from menu list
    handleHome = () => this.props.history.push(HOMEPATH)

    render() {
        return (
            <div>
                <div className="headerDiv">
                    <AppBar position="fixed">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="open drawer">
                                <a target="_blank" rel="noreferrer" href="https://about.instagram.com/"> <InstagramIcon /> </a>
                            </IconButton>
                            <Typography variant="h6" noWrap>  {INSTAGRAM} </Typography>
                            <div />
                            <div className="headerLeftIcons">
                                <IconButton
                                    aria-label="show 4 new mails"
                                    color="inherit"
                                    onClick={this.handleMessageIcon}
                                >
                                    <Badge badgeContent={5} color="secondary"> <MailIcon />  </Badge>
                                </IconButton>
                                <IconButton
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                    onClick={this.handleNotificationIcon}
                                >
                                    <Badge badgeContent={7} color="secondary"><NotificationsIcon /> </Badge>
                                </IconButton>
                                <Button
                                    className="AccountIcon"
                                    variant="contained"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={this.openPopOver} >
                                    <AccountCircle />
                                </Button>
                                <Menu
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={!!this.state.anchorEl}
                                    onClose={this.popOverClose}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }} >
                                    <MenuItem onClick={this.handleProfile}>{PROFILE}</MenuItem>
                                    <MenuItem onClick={this.handleDialogOpen}>{LOGOUT}</MenuItem>
                                    {this.props.page === HOMEPAGE ? <MenuItem onClick={this.handleHome}>
                                        {HOME}
                                    </MenuItem> : <MenuItem onClick={this.handleSavedItems}>
                                        {SAVED_ITEMS}
                                    </MenuItem>}
                                </Menu>
                                {this.state.dialogOpen ? (
                                    <Popover
                                        dialogOpen={this.state.dialogOpen}
                                        updatePopOverState={this.handleUpdatePopoverState}
                                    />
                                ) : EMPTY}
                                {this.state.modalOpen ? (
                                    <ModalComponent
                                        modalOpen={this.state.modalOpen}
                                        page={modalPage}
                                        message={modalMessage}
                                        image={modalImage}
                                        updateModalState={this.updateModalState}
                                    />
                                ) : EMPTY}
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        //getting username while login from store
        username: state.common.username,
    }
}

export default withRouter(connect(mapStateToProps, null)(AppHeader))
