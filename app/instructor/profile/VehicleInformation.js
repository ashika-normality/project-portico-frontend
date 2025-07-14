import { useState } from "react";

import LabeledDatePicker from "@/app/components/LabeledDatePicker";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import LabeledFileUpload from "@/app/components/LabeledFileUpload";

function VehicleInformation() {
    
    return (
        <div className="flex flex-col w-full bg-white rounded-xl shadow-equal p-8 space-y-4">
            <h1 className="text-tonedblack text-lg font-bold font-raleway">Driving License Information</h1>
            <div className="w-full flex space-x-3">
            </div>
        </div>
    );
}

export default VehicleInformation;