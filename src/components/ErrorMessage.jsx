
const ErrorMessage = ({ message }) => {
  const show = message.length>0 && message!=="empty";
  return (
    <div className={"solo-line "+(show? "text-danger" : "white-color")}>
			<ul>
				<li style={{fontSize: "13px"}}>{message}</li>
			</ul>
		</div>
	);
}
export default ErrorMessage