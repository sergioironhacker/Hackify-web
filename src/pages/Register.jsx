
import Input from './Input';

function SignUpForm() {
    return (
        <div className="card-back">
            <div className="center-wrap">
                <div className="section text-center">
                    <h4 className="mb-3 pb-3">Sign Up</h4>
                    <div className="form-group">
                        <Input type="text" placeholder="Username" icon="uil uil-user" />
                    </div>
                    <div className="form-group mt-2">
                        <Input type="email" placeholder="Email" icon="uil uil-at" />
                    </div>
                    <div className="form-group mt-2">
                        <Input name="password" type="password" placeholder="Password" icon="uil uil-lock-alt" />
                    </div>
                    <a href="#" className="btn mt-4">Register</a>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm