import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import AppHeader from '../../Components/AppHeader/AppHeader'
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
import './Profile.css'
import { HOMEPAGE, HOMEPATH, LIKED, POSTED_BY, NO_PROFILE_ITEMS } from '../../Common/CommonConstants'

class Profile extends Component {
    render() {
        return (
            <div>
                <AppHeader page={HOMEPAGE} path={HOMEPATH} />
                {this.props.newsFeedListData &&
                    this.props.newsFeedListData.length ? <div className="newsFeedProfileBody">
                    {this.props.newsFeedListData.map((item) => {
                        if (item.owner === this.props.username)
                            return (
                                <Card className="rootProfile" key={item.title}>
                                    <CardHeader avatar={
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
                                        title={item.title}
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary" >
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="like">{item.likedStatus === true ? (
                                            <>
                                                <Typography>{LIKED}</Typography>
                                                <FavoriteIcon style={{ color: "red" }} />
                                            </>
                                        ) : <FavoriteBorderIcon />} </IconButton>
                                        <IconButton aria-label="share" disabled>   <ShareIcon /> </IconButton>
                                        <IconButton aria-label="save">     {item.savedStatus === true ? (
                                            <BookmarkIcon />
                                        ) : <BookmarkBorderIcon />} </IconButton>
                                    </CardActions>
                                    <Typography
                                        variant="body2"
                                        className="postedByName"
                                        color="textSecondary">
                                        {POSTED_BY} {item.owner}
                                    </Typography>
                                </Card>
                            )
                        else return <div className="noProfileItemsDiv">{NO_PROFILE_ITEMS}</div>
                    })}
                </div>
                    : <div className="noProfileItemsDiv">{NO_PROFILE_ITEMS}</div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        //getting username while login from store
        username: state.common.username,
        newsFeedListData: state.common.newsfeedPostList
    }
}

export default withRouter(connect(mapStateToProps, null)(Profile))
