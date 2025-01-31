import { Route, Routes } from "react-router-dom";
import Form from '../Form/Form';
import Success from '../Success/Success';

import "./App.css";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Form />} />
      <Route path='/success' element={<Success />} />
		</Routes>
	);
}

export default App;
