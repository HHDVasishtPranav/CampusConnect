import { useAuth } from "../../hooks/useAuth";
import "./styles.css";

function UnauthenticatedApp() {
  const { login } = useAuth();

  return (
    <>
      <div className="LogIn">
        <p>use you organization mail</p>
        <button onClick={login} className="login">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
            alt="Google Icon"
          /><p>mail</p>
        </button>
      </div>
    </>
  );
}

export { UnauthenticatedApp };
