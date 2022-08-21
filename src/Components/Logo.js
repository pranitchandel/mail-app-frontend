import AlternateEmailSharpIcon from "@mui/icons-material/AlternateEmailSharp";

const Logo = (props) => {
  return (
    <div className={props.cls}>
      <span className="logoSpan">MyM</span>
      <span className="logoSpan">
        <AlternateEmailSharpIcon />
      </span>
      <span className="logoSpan">il</span>
    </div>
  );
};

export default Logo;
