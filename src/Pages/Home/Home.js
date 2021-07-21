import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Avatar from "@material-ui/core/Avatar"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder"
import BookmarkIcon from "@material-ui/icons/Bookmark"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import "./Home.css"
import { savedList } from "../../action/commonAction"
import AppHeader from "../../Components/AppHeader/AppHeader"
import { LIKED, NO_HOME_ITEMS, POSTED_BY, SAVEPAGE, SAVEPATH } from "../../Common/CommonConstants"

let savedListArray = []
export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchor: false,
      anchorEl: null,
      dialogOpen: false,
      modalOpen: false,
      liked: false
    }
  }

  //used to handling like feature functionality
  handleLike = (item) => {
    item.likedStatus = !item.likedStatus
    this.setState({ liked: !item.likedStatus })
  }
  //used to handling saved items feature functinality
  handleSave = (item) => {
    item.savedStatus = !item.savedStatus
    this.setState({ liked: !item.savedStatus })
    if (item.savedStatus) {
      if (savedListArray.length === 0)
        savedListArray.push(item)
      for (let i = 0; i < savedListArray.length; i++) {
        if (item.title !== savedListArray[i].title) {
          savedListArray.push(item)
          break;
        }
      }
    }
    else {
      savedListArray.map((listItem, index) => {
        if (listItem.title === item.title)
          savedListArray.splice(index, 1)
        return null
      })
    }
  }
  //used to render like feature in the card
  likeRender = (item) => {
    return (
      <IconButton
        onClick={this.handleLike.bind(this, item)}
        aria-label="add to favorites" >
        {item.likedStatus ? (
          <>
            <Typography>{LIKED}</Typography>
            <FavoriteIcon style={{ color: "red" }} />
          </>
        ) : <FavoriteBorderIcon />}
      </IconButton>
    )
  }
  //used to render save feature in the card
  saveRender = (item) => {
    return (
      <IconButton aria-label="save" onClick={this.handleSave.bind(this, item)}>
        {item.savedStatus ? (
          <BookmarkIcon />
        ) : <BookmarkBorderIcon />}
      </IconButton>
    )
  }

  render() {
    return (
      <div>
        <AppHeader page={SAVEPAGE} path={SAVEPATH} />
        {this.props.newsFeedListData &&
                    this.props.newsFeedListData.length ?
        <div className="newsFeedBody">
          {this.props.newsFeedListData.map((item) => {
            return (
              <Card className="root" key={item.title}>
                <CardHeader avatar={
                  <Avatar aria-label="recipe" > {item.avatar}</Avatar>}
                  title={item.title}
                  subheader="September 14, 2016" />
                <CardMedia
                  className="media"
                  image={item.image}
                  title={item.title} />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  {this.likeRender(item)}
                  <IconButton aria-label="share" style={{ cursor: 'not-allowed' }} > <ShareIcon /></IconButton>
                  {this.saveRender(item)}
                </CardActions>
                <Typography
                    variant="body2"
                    className="postedByName"
                    color="textSecondary">
                    {POSTED_BY} {item.owner}
                  </Typography>
              </Card>
            )
          })}
        </div>:   <div className="noHomeItemsDiv">{NO_HOME_ITEMS}</div>}
      </div>
    )
  }
  //used to send the data to saveditems page when current page ends 
  componentWillUnmount() {
    this.props.savedList(savedListArray)
  }
}

const mapStateToProps = (state) => {
  return {
    //getting username while login from store
    username: state.common.username,
    newsFeedListData: state.common.newsfeedPostList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //dispatching saved to set the data to store
    savedList: (data) => dispatch(savedList(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
