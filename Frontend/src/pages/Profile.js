import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUpTwoTone";
import AudioTodoIcon from "@material-ui/icons/AudioTodoTwoTone";
import Divider from "@material-ui/core/Divider";
import format from "date-fns/format";

import AudioPlayer from "components/common/AudioPlayer";
import Error from "components/common/Error";
import Loading from "components/common/Loading";

const Profile = ({ classes, match }) => {
  const id = match.params.id;
  return (
    <Query query={PROFILE_QUERY} variables={{ id }}>
      {({ data, loading, error }) => {
        if (loading) return <Loading />;
        if (error) return <Error error={error} />;

        return (
          <div>
            {/* User Info Card */}
            <Card className={classes.card}>
              <CardHeader
                avatar={<Avatar>{data.user.username[0]}</Avatar>}
                title={data.user.username}
                subheader={`Joined ${format(
                  data.user.dateJoined,
                  "MMM Do, YYYY"
                )}`}
              />
            </Card>

            {/* Created Todos */}
            <Paper elevation={1} className={classes.paper}>
              <Typography variant="title" className={classes.title}>
                <AudioTodoIcon className={classes.audioIcon} />
                Created Todos
              </Typography>
              {data.user.todoSet.map(todo => (
                <div key={todo.id}>
                  <Typography>
                    {todo.title} · {todo.actions.length} Actions
                  </Typography>
                  <AudioPlayer url={todo.url} />
                  <Divider className={classes.divider} />
                </div>
              ))}
            </Paper>

            {/* Actioned Todos */}
            <Paper elevation={1} className={classes.paper}>
              <Typography variant="title" className={classes.title}>
                <ThumbUpIcon className={classes.thumbIcon} />
                actioned Todos
              </Typography>
              {data.user.actionSet.map(({ todo }) => (
                <div key={todo.id}>
                  <Typography>
                    {todo.title} · {todo.actions.length} Actions ·{" "}
                    {todo.postedBy.username}
                  </Typography>
                  <AudioPlayer url={todo.url} />
                  <Divider className={classes.divider} />
                </div>
              ))}
            </Paper>
          </div>
        );
      }}
    </Query>
  );
};

const PROFILE_QUERY = gql`
  query($id: Int!) {
    user(id: $id) {
      id
      username
      dateJoined
      ActionSet {
        id
        todo {
          id
          title
          url
          actions {
            id
          }
          postedBy {
            id
            username
          }
        }
      }
      todoSet {
        id
        title
        url
        actions {
          id
        }
      }
    }
  }
`;

const styles = theme => ({
  paper: {
    width: "auto",
    display: "block",
    padding: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    [theme.breakpoints.up("md")]: {
      width: 650,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  card: {
    display: "flex",
    justifyContent: "center"
  },
  title: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing.unit * 2
  },
  audioIcon: {
    color: "purple",
    fontSize: 30,
    marginRight: theme.spacing.unit
  },
  thumbIcon: {
    color: "green",
    marginRight: theme.spacing.unit
  },
  divider: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

export default withStyles(styles)(Profile);
