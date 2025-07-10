//login page for instructor
import Image from "next/image";
import carImage from "../../../public/Assets/login-car.webp"

import TextInTheMiddle from "@/app/components/TextInTheMiddle";
import MildOrangeButton from "@/app/components/MildOrangeButton";
import LoginForm from "./LoginForm";

const Login = (props) => {

  return(
    <div className="flex w-full justify-center items-center py-4">
        <div className="flex mx-4 md:mx-16 w-full bg-white rounded-portico-main shadow-forbox">
            <div className="w-2/5 hidden md:block">
                <Image
                    src={carImage}
                    alt="Car Image"
                    className="object-cover"
                />
            </div>

            <div className="w-full md:w-3/5 flex items-start justify-center py-10">
                <div className="w-3/4 mx-auto">
                    
                    <div>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>

    </div>
  );
}

export default Login;