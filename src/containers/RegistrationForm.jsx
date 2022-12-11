import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const CompletePayment = () => {
	//Mock Function to Complete Payment
	return true;
};

const registerEndpoint = `/api/register`;

const RegistrationForm = (props) => {


	const [batch, setBatch] = useState("6-7AM");
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [payDate, setPayDate] = useState("");
	const [paymentStatus, setPaymentStatus] = useState(false);
	const [validAge, setValidAge] = useState(true);
	const [validName, setValidName] = useState(true);
	const [validPayDate, setValidPayDate] = useState(true);

	const isDatePast = (datep) => {
		return Date.parse(datep) - Date.parse(new Date()) < 0;
  };

  const showNotification = (title, message, type) => {
    Store.addNotification({
			title: title,
			message: message,
			type: type,
			insert: "bottom",
			container: "bottom-left",
			animationIn: ["animate__animated", "animate__fadeIn"],
			animationOut: ["animate__animated", "animate__fadeOut"],
			dismiss: {
				duration: 5000,
				onScreen: true,
			},
		});
  }

	const submitForm = async (personJson) => {
		//TODO Function to Submit Form
		console.log("Form Submit");
		console.log(personJson);
		try {
      const response = await fetch(registerEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: personJson,
      })
      const data = await response.json();
      if (data.success) {
        setPayDate("");
        setName("");
        setBatch("6-7AM");
        setAge("");
        setPaymentStatus(false);
        showNotification("Submitted Successful",data.message,"success")
        console.log(data.message);
      }
      else {
        showNotification("Submitted Failed", data.message, "danger");
				console.log(response.json.message);
      }
    } catch (error) {
      showNotification("Submitted Failed","Submission Interrupted Unexpectedly", "danger");
			// console.log(error);
		}
	};

	const rowGap = (
		<Row>
			<br />
		</Row>
	);
	return (
		<div className="wrapper">
			<div className="metadata-input-window">
				<Container>
					<Row>
						<Col>
							<Form.Group controlId="nameSelect">
								<Form.Label className="form-align">
									{"Enter Your Name"}
								</Form.Label>
								<Form.Control
									type="text"
									value={name}
									className="center form-text-window"
									style={{ width: "100%" }}
									placeholder={"Ryan Reynolds"}
									onChange={(e) => {
										setName(e.target.value);
										setValidName(e.target.value.length > 0);
									}}
								></Form.Control>
								<div className="error-wrapper">
									<ErrorMessage
										message={validName ? "" : "Name cannot be empty"}
									/>
								</div>
							</Form.Group>
						</Col>
					</Row>
					{rowGap}
					<Row>
						<Col>
							<Form.Group controlId="ageSelect">
								<Form.Label className="form-align">
									{"Enter Your Age"}
								</Form.Label>
								<Form.Control
									type="number"
									value={age}
									className="form-text-window"
									placeholder={34}
									onChange={(e) => {
										setAge(e.target.value);
										setValidAge(e.target.value >= 18 && e.target.value <= 65);
									}}
								></Form.Control>
								<div className="error-wrapper">
									<ErrorMessage
										message={validAge ? "" : "Age must be between 18 and 65"}
									/>
								</div>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="payDateSelect">
								<Form.Label className="form-align">
									{"Select your Pay Date"}
								</Form.Label>
								<Form.Control
									type="date"
									value={payDate}
									className="form-text-window"
									onChange={(e) => {
										setPayDate(e.target.value);
										setValidPayDate(!isDatePast(e.target.value));
									}}
								></Form.Control>
							</Form.Group>
							<div className="error-wrapper">
								<ErrorMessage
									message={
										validPayDate
											? ""
											: "Date selected must be after current Date"
									}
								/>
							</div>
						</Col>
					</Row>
					{rowGap}
					<Row>
						<Col>
							<Form.Group controlId="batchSelect">
								<Form.Label className="form-align">
									{"Select your Batch"}
								</Form.Label>
								<Form.Control
									as="select"
									value={batch}
									onChange={(e) => {
										setBatch(e.target.value);
									}}
								>
									<option value="6-7AM">6-7AM</option>
									<option value="7-8AM">7-8AM</option>
									<option value="8-9AM">8-9AM</option>
									<option value="5-6PM">5-6PM</option>
								</Form.Control>
							</Form.Group>
						</Col>
					</Row>
					{rowGap}
					<Row>
						<Col>
							<Button
								disabled={
									paymentStatus || payDate.length === 0 || isDatePast(payDate)
								}
								onClick={() => {
									const result = CompletePayment();
									setPaymentStatus(result);
                  if (result) {
                    showNotification(
											"Payment Successful",
											"Payment was successfully completed",
											"success"
										);
                  } else {
                    showNotification(
											"Payment Failed",
											"Payment was not completed",
											"danger"
										);
									}
								}}
							>
								<div className="browse-text">{"Make Payment"}</div>
							</Button>
						</Col>
						<Col>
							<Button
								disabled={
									!paymentStatus ||
									age < 18 ||
									age > 65 ||
									name.length === 0 ||
									isDatePast(payDate)
								}
								onClick={() => {
									const personJson = JSON.stringify({
										name: name,
										age: age,
										payDate: payDate,
										batch: batch,
									});
									submitForm(personJson);
								}}
							>
								<div className="browse-text">{"Submit"}</div>
							</Button>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
};

export default RegistrationForm;
