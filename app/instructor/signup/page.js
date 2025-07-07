import LabeledFileUpload from "@/app/components/LabeledFileUpload";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import LabeledTextbox from "@/app/components/LabeledTextbox";
import PrimaryButton from "@/app/components/PrimaryButton";
import { MdCloudUpload } from "react-icons/md";

const page = () => (
    <div className="w-full flex justify-center items-start min-h-screen py-16 bg-[url('/Assets/background-image-signup.webp')] bg-cover bg-center bg-no-repeat">
        <div className="w-full md:w-1/2 m-1 flex flex-col space-y-2.5 justify-center items-center bg-white rounded-lg shadow-small px-2 py-8">
            <h1 className="font-raleway text-xl font-bold text-primary">Instructor Sign Up</h1>
            <p className="font-source-sans text-greydarker">Sign up to get verified and start your journey with us!</p>
            <form className="flex flex-col space-y-4 w-full py-3 px-6">
                <div className="full flex justify-between items-center space-x-4">
                    <LabeledInput 
                        label={"First Name"}
                        name="first_name"
                        type="text"
                        required={true}
                    />
                    <LabeledInput 
                        label={"Last Name"}
                        name="last_name"
                        type="text"
                        required={true}
                    />
                </div>
                <div className="full flex justify-between items-center space-x-4">
                <LabeledInput 
                        label={"Email Address"}
                        name="email_address"
                        type="email"
                        required={true}
                    />
                    <LabeledInput 
                        label={"Mobile"}
                        name="mobile"
                        type="text"
                        required={true}
                    />
                </div>
                <LabeledInput 
                    label={"Address Line 1"}
                    name="address_line_1"
                    type="text"
                    placeholder={"Street Address"}
                    required={true}
                />
                <LabeledInput 
                    label={"Address Line 2"}
                    name="address_line_2"
                    type="text"
                    placeholder={"Apartment, Suite, Unit, Building, Floor, etc."}
                    required={false}
                />
                <div className="full flex justify-between items-center space-x-4">
                    <div className="w-4/10">
                        <LabeledInput 
                            label={"Postcode"}
                            name="postcode"
                            type="text"
                            required={true}
                        />
                    </div>
                    <div className="w-6/10">
                        <LabeledSelect
                            label={"Country"}
                            name="country"
                            options={[
                                { value: "city1", label: "City 1" },
                                { value: "city2", label: "City 2" },
                                { value: "city3", label: "City 3" }
                            ]}
                            required={true}
                            placeholder="Australia"
                        />
                        
                    </div>
                </div>
                <div className="full flex justify-between items-center space-x-4">
                    <div className="w-4/10">
                    <LabeledSelect
                            label={"State"}
                            name="state"
                            options={[
                                { value: "city1", label: "City 1" },
                                { value: "city2", label: "City 2" },
                                { value: "city3", label: "City 3" }
                            ]}
                            required={true}
                            placeholder="Choose your State"
                        />
                    </div>
                    <div className="w-6/10">
                        <LabeledSelect
                            label={"City/Suburb"}
                            name="city"
                            options={[
                                { value: "city1", label: "City 1" },
                                { value: "city2", label: "City 2" },
                                { value: "city3", label: "City 3" }
                            ]}
                            required={true}
                            placeholder="Choose your City/Suburb"
                        />
                    </div>
                </div>
                <div className="full flex justify-between items-center space-x-4">
                    <div className="w-4/10">
                        <LabeledInput
                            label={"Driving License Number"}
                            name="driving_license_number"
                            type="text"
                            required={true}
                        />
                    </div>
                    <div className="w-6/10">
                        <LabeledInput
                            label={"Instructor License Number"}
                            name="instructor_license_number"
                            type="text"
                            required={true}
                        />
                    </div>
                </div>
                <div className="full flex justify-between items-center space-x-4">
                    <div className="w-4/10">
                        <LabeledInput
                            label={"WWCC Number"}
                            name="wwcc_number"
                            type="text"
                            required={true}
                        />
                    </div>
                    <div className="w-6/10">
                        <LabeledInput
                            label={"Driving School Name"}
                            name="driving_school_name"
                            type="text"
                            required={false}
                        />
                    </div>
                </div>
                <LabeledInput 
                    label={"Website"}
                    name="website"
                    type="text"
                    required={false}
                />
                <LabeledTextbox
                    label={"Bio"}
                    name="bio"
                    required={false}
                    rows={3}
                />
                <LabeledFileUpload
                    label="Upload Photograph"
                    icon={<MdCloudUpload size={40} />}
                    name="photograph"
                    required
                    tooltip="Accepted formats: PDF, JPG, PNG. Max size: 5MB."
                    accept=".pdf,.jpg,.jpeg,.png"
                />
                <div className="flex items-center space-x-2 pt-2 pb-4">
                    <input type="checkbox" id="terms" name="terms" className="mr-2" required />
                    <label htmlFor="terms" className="text-sm font-source-sans">
                        By signing up you agree to our <a href="/terms" className="text-primary hover:underline">Terms and conditions</a> and <a href="/terms" className="text-primary hover:underline">Privacy policy*</a>
                    </label>
                </div>
                <PrimaryButton
                    text="Sign Up"
                    type="submit"
                />
            </form>
            <span className="text-sm font-raleway text-center">Already have an Account? <a href="login" className="text-primary hover:underline font-semibold">Login</a></span>
        </div>
    </div> 
);

export default page;