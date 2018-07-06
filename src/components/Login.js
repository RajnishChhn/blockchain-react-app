import React from 'react';

class Login extends React.Component {
    handleSubmmit() {
       window.location.href = "https://composer-rest-server-coyote-acl-network.mybluemix.net/auth/github";
    }
    render() {
        return (
            <div className="row justify-content-center">
              <div className="col-lg offset-5">
                <div className="emulation-container">   
                  <h4>GitHub Authentication</h4>                 
                  <button className="btn btn-primary" onClick={()=>this.handleSubmmit()}>Login Using GitHub</button>                  
                </div>         
              </div>
            </div>  
)}
}

export default Login;