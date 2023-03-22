import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../App";
import "./_index.scss";
type LocationProps = {
  state: {
    from: Location;
  };
};

type LoginData = {
  username: string;
  password: string;
  prev: null;
};

const Login = () => {
  const [login, setLoginData] = useState<LoginData | null>(null);
  let navigate = useNavigate();
  let location = useLocation() as unknown as LocationProps;
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/app";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    auth.signin(login?.username!, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  };

  const [inputType, setInputType] = useState("password");
  return (
    // <div className="dark-background">
    //   <div className="background">
    //     <div className="shape"></div>
    //     <div className="shape"></div>
    //   </div>
    //   <form onSubmit={handleSubmit} className="form login">
    //     <h3>Login Here</h3>

    //     <label htmlFor="username">Username</label>
    //     <input
    //       type="text"
    //       placeholder="Email or Phone"
    //       id="username"
    //       onChange={(e) =>
    //         setLoginData((prev: any) => ({
    //           ...prev,
    //           username: e.target.value
    //         }))
    //       }
    //     />

    //     <label htmlFor="password">Password</label>
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       id="password"
    //       onChange={(e) =>
    //         setLoginData((prev: any) => ({
    //           ...prev,
    //           password: e.target.value
    //         }))
    //       }
    //     />

    //     <button type="submit">Log In</button>
    //     <div className="social">
    //       <div className="go">
    //         <i className="fab fa-google"></i> Google
    //       </div>
    //       <div className="fb">
    //         <i className="fab fa-facebook"></i> Facebook
    //       </div>
    //     </div>
    //   </form>
    // </div>

    <div className="loginFormBg">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="loginForm">
        <div className="loginForm-header text-center">
          {/* <img
            data-tut="tour__logo"
            src={require("../../Assets/images/vkpatel.png")}
            alt="logo"
            className="logo-img"
          /> */}
          <i className="fa-solid fa-square-poll-vertical fa-3x"></i>
  
        </div>

        <div className="loginForm-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group userIcon">
              <div>
                <input
                  type="text"
                  placeholder="Email or Phone"
                  id="username"
                  className="form-control "
                  onChange={(e) =>
                    setLoginData((prev: any) => ({
                      ...prev,
                      username: e.target.value
                    }))
                  }
                />
              </div>
            </div>
            <div className="form-group eyeSlash lockIcon">
              <div
                className="loginShowInput"
                onMouseDown={() =>
                  setInputType(inputType === "input" ? "password" : "input")
                }
                onMouseUp={() =>
                  setInputType(inputType === "input" ? "password" : "input")
                }
              >
                {inputType === "input" ? (
                  <i className="fa fa-eye-slash" />
                ) : (
                  <i className="fa fa-eye" />
                )}
              </div>
              <div>
                <input
                  id="password"
                  type={inputType}
                  name="password"
                  placeholder="Password"
                  className="form-control "
                  onChange={(e) =>
                    setLoginData((prev: any) => ({
                      ...prev,
                      password: e.target.value
                    }))
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary loginFormBtn">
                <i className="fa fa-sign-in" aria-hidden="true" />
                &nbsp; Sign me in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
