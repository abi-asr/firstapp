import React, { Component } from 'react'
import './AppHeader.css'
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"
import Badge from "@material-ui/core/Badge"
import InstagramIcon from "@material-ui/icons/Instagram"
import SearchIcon from "@material-ui/icons/Search"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MailIcon from "@material-ui/icons/Mail"
import Button from "@material-ui/core/Button"
import NotificationsIcon from "@material-ui/icons/Notifications"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
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
    MESSAGE_INFO,
    NOTIFICATION_INFO,
    PROFILE,
    PROFILE_INFO,
    SAVED_ITEMS,
    SAVEPATH,
} from "../../Common/CommonConstants"
import Popover from "../../Components/Popover/Popover"
import ModalComponent from "../../Components/Modal/ModalComponent"

let modalMessage = EMPTY,
    modalImage = EMPTY,
    modalPage = EMPTY
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

    handleDialogOpen = () =>
        this.setState({
            dialogOpen: true,
            anchorEl: null,
        })

    openPopOver = (event) =>
        this.setState({
            anchorEl: event.currentTarget,
        })

    popOverClose = () => {
        this.setState({
            anchorEl: null,
        })
        this.state.dialogOpen = false
        this.state.modalOpen = false
    }

    handleLike = (index, item, event) => {
        item.likedStatus = !item.likedStatus
        // Toggle the state variable liked
        this.setState({ liked: !item.likedStatus })
    }

    handleProfile = () => {
        this.setState({ modalOpen: true })
        modalMessage = PROFILE_INFO
        modalImage = celebrate
        modalPage = "profile"
    }

    handleNotificationIcon = () => {
        this.setState({ modalOpen: true })
        modalMessage = NOTIFICATION_INFO
        modalImage = pageUnderConstruction
        modalPage = "notification"
    }

    handleMessageIcon = () => {
        this.setState({ modalOpen: true })
        modalMessage = MESSAGE_INFO
        modalImage = messagePageConstruction
        modalPage = "message"
    }


    updateModalState = (modalOpenFromChild) => {
        this.setState({ modalOpen: modalOpenFromChild })
    }

    handleUpdatePopoverState = (dialogOpenFromChild) => {
        this.setState({ dialogOpen: dialogOpenFromChild })
    }

    handleSavedItems = () => this.props.history.push(SAVEPATH)
    handleHome = () => this.props.history.push(HOMEPATH)

    render() {
        return (
            <div>
                <div className="headerDiv">
                    <AppBar position="fixed">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="open drawer">
                                <a target="_blank" href="https://about.instagram.com/">
                                    <InstagramIcon />
                                </a>
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                {INSTAGRAM}
                            </Typography>
                            <div className="seachField">
                                <div className="seachIcon">
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    className="seachInput"
                                    placeholder="Search…"
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </div>
                            <div />
                            <div className="headerLeftIcons">
                                <IconButton
                                    aria-label="show 4 new mails"
                                    color="inherit"
                                    onClick={this.handleMessageIcon}
                                >
                                    <Badge badgeContent={4} color="secondary">
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                    onClick={this.handleNotificationIcon}
                                >
                                    <Badge badgeContent={17} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <Button
                                    className="AccountIcon"
                                    variant="contained"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={this.openPopOver}
                                >
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
                                    }}
                                >
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
                                ) : (
                                    EMPTY
                                )}
                                {this.state.modalOpen ? (
                                    <ModalComponent
                                        modalOpen={this.state.modalOpen}
                                        page={modalPage}
                                        message={modalMessage}
                                        image={modalImage}
                                        updateModalState={this.updateModalState}
                                    />
                                ) : (
                                    EMPTY
                                )}
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
        username: state.common.username,
    }
}

export default withRouter(connect(mapStateToProps, null)(AppHeader))
