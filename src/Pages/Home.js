import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import InstagramIcon from "@material-ui/icons/Instagram";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { newsFeedList } from "../jsonUtil";
import { withRouter } from "react-router-dom";
import "./Home.css";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor: false,
      anchorEl: null,
      dialogOpen: false,
    };
  }

  openPopOver = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  popOverClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleLogOut = () => {
    this.props.history.push("/login");
  };

  handleSavedItems = () => {
    this.props.history.push("/savedItems");
  };

  handleDialogOpen = () => {
    this.setState({
      dialogOpen: true,
    });
  };

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  render() {
    return (
      <div>
        <div style={{ height: "50px" }}>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="open drawer">
                <InstagramIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Instagram
              </Typography>
              <div className="seachField" style={{}}>
                <div style={{ marginTop: "5px" }}>
                  <SearchIcon />
                </div>
                <InputBase
                  style={{ marginLeft: "5px" }}
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <div />
              <div style={{ marginLeft: "35%" }}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
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
                  <MenuItem>Profile</MenuItem>
                  <MenuItem onClick={this.handleDialogOpen}>Logout</MenuItem>
                  <MenuItem onClick={this.handleSavedItems}>
                    Saved Items
                  </MenuItem>
                </Menu>
                <Dialog
                  open={this.state.dialogOpen}
                  onClose={this.handleDialogClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Are you sure want to Logout?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={this.handleDialogClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={this.handleLogOut}
                      color="primary"
                      autoFocus
                    >
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <div style={{ height: "595px", marginTop: "10px" }}>
          {newsFeedList.map((item) => {
            return (
              <Card className="root">
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className="avatar">
                      {item.avatar}
                    </Avatar>
                  }
                  title={item.title}
                  subheader="September 14, 2016"
                />
                <CardMedia
                  className="media"
                  image={item.image}
                  height
                  title="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton aria-label="save">
                    <BookmarkBorderIcon />
                  </IconButton>
                </CardActions>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
