import logo from "./logo.svg";
import "./App.css";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import styles from"@aws-amplify/ui-react/styles.css";

const App = ({ signOut, user }) => {
  return (
    <div style={styles.container}>
      <Heading level={1}>Hello {user.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>
      <h2>Amplify Todos</h2>
    </div>
  );
};

export default withAuthenticator(App);
