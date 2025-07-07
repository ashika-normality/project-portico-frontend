//login page for instructor
import Image from "next/image";
import carImage from "../../../public/Assets/login-car.webp"
import googleIcon from "../../../public/Assets/google-icon.svg";
import facebookIcon from "../../../public/Assets/fb-black.svg";
import TextInTheMiddle from "@/app/components/TextInTheMiddle";
import MildOrangeButton from "@/app/components/MildOrangeButton";
import PrimaryButton from "@/app/components/PrimaryButton";
import LabeledInput from "../../components/LabeledInput";

const Login = (props) => {

  return(
    <div className="flex w-full justify-center items-center py-4">
        <div className="flex mx-16 w-full bg-white rounded-portico-main shadow-forbox">
            <div className="w-2/5 hidden md:block">
                <Image
                    src={carImage}
                    alt="Car Image"
                    className="object-cover"
                />
            </div>

            <div className="w-full md:w-3/5 flex items-start justify-center py-10">
                <div className="w-3/4 mx-auto">
                    <div className="py-3 mx-auto border-b-2 w-2/3 text-base font-raleway font-bold text-center">
                        <p>Login</p>
                    </div>
                    <div>
                        <form className="flex flex-col gap-4 my-8">
                            <LabeledInput
                                label="Email or Phone Number"
                                name="email_phone"
                                type="text"
                                placeholder="Enter your Email or Phone number"
                                required
                            />
                            <PrimaryButton text="Continue" type="submit" />
                        </form>
                        <TextInTheMiddle text="or continue with" color="greyforline"/>
                        <div className="flex gap-6 mt-2">
                            <MildOrangeButton icon={googleIcon} altIcon="Google Icon" text="Google" />
                            <MildOrangeButton icon={facebookIcon} altIcon="Facebook Icon" text="Facebook" />
                        </div>
                        <div>
                            <p className="text-sm font-raleway mt-6 text-center">
                                Don&apos;t have an account? <a href="signup" className="text-primary font-semibold hover:underline cursor-pointer">Sign Up</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  );
}

export default Login;