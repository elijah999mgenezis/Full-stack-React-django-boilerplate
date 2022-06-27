import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";

import AudioPlayer from "common/AudioPlayer";
import ActionTodo from "./ActionTodo";
import DeleteTodo from "./DeleteTodo";
import UpdateTodo from "./UpdateTodo";

const TodoList = ({ classes, todos }) => (
  <List>
  {console.log("lol"+process.env.REACT_APP_UPLOAD_PRESET)}
    {todos.map(todo => (
      <ExpansionPanel key={todo.id}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <ListItem className={classes.root}>
            <ActionTodo todoId={todo.id} actionCount={todo.actions.length} />
            <ListItemText
              primaryTypographyProps={{
                variant: "subheading",
                color: "primary"
              }}
              primary={todo.title}
              secondary={
                <Link
                  className={classes.link}
                  to={`/profile/${todo.postedBy.id}`}
                >
                  {todo.postedBy.username}
                </Link>
              }
            />
            <AudioPlayer url={todo.url} />
          </ListItem>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <Typography variant="body1">{todo.description}</Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <UpdateTodo todo={todo} />
          <DeleteTodo todo={todo} />
        </ExpansionPanelActions>
      </ExpansionPanel>
    ))}
  </List>
);

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  details: {
    alignItems: "center"
  },
  link: {
    color: "#424242",
    textDecoration: "none",
    "&:hover": {
      color: "black"
    }
  }
};

export default withStyles(styles)(TodoList);
