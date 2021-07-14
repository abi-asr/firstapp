import React, { Component } from 'react'
import AppHeader from '../../Components/AppHeader/AppHeader'
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Avatar from "@material-ui/core/Avatar"
import ShareIcon from "@material-ui/icons/Share"
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import { connect } from "react-redux"
import './Save.css'
import { HOMEPAGE, HOMEPATH, NO_SAVED_ITEMS } from '../../Common/CommonConstants'

//This Class is used to rendering saved items
class Save extends Component {

    render() {
        return (
            <div>
                <AppHeader page={HOMEPAGE} path={HOMEPATH} />
                {this.props.newsfeedSavedList &&
                    this.props.newsfeedSavedList.length === 0 ? <div className="noSavedItemsDiv">{NO_SAVED_ITEMS}</div>
                    : <div className="newsFeedSaveBody">
                        {this.props.newsfeedSavedList.map((item, index) => {
                            return (
                                <Card className="rootSave">
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
                                        title="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p" F  >
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="share"><FavoriteBorderIcon /> </IconButton>
                                        <IconButton aria-label="share" disabled>   <ShareIcon /> </IconButton>
                                        <IconButton aria-label="save">    <BookmarkBorderIcon /> </IconButton>
                                    </CardActions>
                                </Card>
                            )
                        })}
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        //getting saved list items from store
        newsfeedSavedList: state.common.newsfeedSavedList,
    }
}

export default connect(mapStateToProps, null)(Save)
