import React, {Fragment} from "react";
import Title from "./components/title/Title";
import ToDo from "./containers/todo/Todo";

const App = () => (
	<Fragment>
		<Title title="ToDo App"/>
		<ToDo />
	</Fragment>
)

export default App