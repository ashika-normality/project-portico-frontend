import { useAppContext } from "@/app/components/AppContext";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import LabeledFileUpload from "@/app/components/LabeledFileUpload";
import TextInTheMiddle from "@/app/components/TextInTheMiddle";
import MildOrangeButton from "@/app/components/MildOrangeButton";
import { IoAddOutline } from "react-icons/io5";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useEffect } from "react";

const vehicleTypes = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "hatchback", label: "Hatchback" },
  { value: "coupe", label: "Coupe" },
  { value: "convertible", label: "Convertible" },
  { value: "wagon", label: "Wagon" },
  { value: "van", label: "Van" },
  { value: "ute", label: "Ute" },
  { value: "other", label: "Other" },
];
const transmissionTypes = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
];
const fuelTypes = [
  { value: "petrol", label: "Petrol" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Electric" },
  { value: "hybrid", label: "Hybrid" },
  { value: "lpg", label: "LPG" },
  { value: "cng", label: "CNG" },
];

function VehicleForm({ countries, register, setValue, index, watch }) {
  const vehicleTypeValue = watch(`vehicles[${index}].vehicleType`);
  const transmissionTypeValue = watch(`vehicles[${index}].transmissionType`);
  const countryOfOriginValue = watch(`vehicles[${index}].countryOfOrigin`);
  const fuelTypeValue = watch(`vehicles[${index}].fuelType`);

  return (
    <div className="w-full flex flex-col space-y-3 pb-4 mb-4">
      <div className="w-full flex space-x-3">
        <div className="w-1/2">
          <LabeledInput
            label="Make"
            name={`vehicles[${index}].make`}
            required={true}
            register={register}
          />
        </div>
        <div className="w-1/2">
          <LabeledInput
            label="Model"
            name={`vehicles[${index}].model`}
            required={true}
            register={register}
          />
        </div>
      </div>
      <div className="w-full flex space-x-3">
        <div className="w-1/2">
          <LabeledInput
            label="Registration Number"
            name={`vehicles[${index}].registrationNumber`}
            required={true}
            register={register}
          />
        </div>
        <div className="w-1/2">
          <LabeledInput
            label="Year of Manufacturing"
            name={`vehicles[${index}].yearOfManufacturing`}
            required={true}
            type="number"
            placeholder="YYYY"
            register={register}
          />
        </div>
      </div>
      <div className="w-full flex space-x-3">
        <div className="w-1/2">
          <LabeledSelect
            label="Vehicle Type"
            name={`vehicles[${index}].vehicleType`}
            options={vehicleTypes}
            setValue={setValue}
            value={vehicleTypeValue}
            onChange={e => setValue(`vehicles[${index}].vehicleType`, e.target.value)}
            required={true}
            register={register}
          />
        </div>
        <div className="w-1/2">
          <LabeledSelect
            label="Transmission Type"
            name={`vehicles[${index}].transmissionType`}
            setValue={setValue}
            options={transmissionTypes}
            value={transmissionTypeValue}
            onChange={e => setValue(`vehicles[${index}].transmissionType`, e.target.value)}
            required={true}
            register={register}
          />
        </div>
      </div>
      <div className="w-full flex space-x-3">
        <div className="w-1/2">
          <LabeledSelect
            label="Vehicle Country of Origin"
            name={`vehicles[${index}].countryOfOrigin`}
            options={countries.map(c => ({ value: c.iso2, label: c.name }))}
            required={true}
            setValue={setValue}
            value={countryOfOriginValue}
            onChange={e => setValue(`vehicles[${index}].countryOfOrigin`, e.target.value)}
            register={register}
          />
        </div>
        <div className="w-1/2">
          <LabeledSelect
            label="Fuel Type"
            name={`vehicles[${index}].fuelType`}
            options={fuelTypes}
            required={true}
            setValue={setValue}
            value={fuelTypeValue}
            onChange={e => setValue(`vehicles[${index}].fuelType`, e.target.value)}
            register={register}
          />
        </div>
      </div>
    </div>
  );
}

function VehicleInformation() {
  const { countries } = useAppContext();
  const { register, setValue, control, watch } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: "vehicles",
  });

  useEffect(() => {
    // Only append if there are no vehicles in both fields and form state
    if (fields.length === 0 && (!control._formValues.vehicles || control._formValues.vehicles.length === 0)) {
      append({
        make: "",
        model: "",
        registrationNumber: "",
        yearOfManufacturing: "",
        vehicleType: "",
        transmissionType: "",
        countryOfOrigin: "",
        fuelType: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.length]);

  const addVehicle = () => {
    append({
      make: "",
      model: "",
      registrationNumber: "",
      yearOfManufacturing: "",
      vehicleType: "",
      transmissionType: "",
      countryOfOrigin: "",
      fuelType: "",
    });
  };

  return (
    <div className="flex flex-col w-full bg-white rounded-xl shadow-equal p-8 space-y-4">
      <h1 className="text-tonedblack text-lg font-bold font-raleway">Vehicle Information</h1>
      {fields.map((field, idx) => (
        <div key={field.id} >
            {idx > 0 && <TextInTheMiddle text={`Vehicle ${idx+1}`}  />}
            <VehicleForm
                key={field.id}
                index={idx}
                countries={countries}
                register={register}
                setValue={setValue}
                watch={watch}
            />
        </div>
      ))}
      <div className="w-full flex justify-end">
        <div className="">
          <MildOrangeButton
          text="Add Vehicle"
          border='primary'
          icon={<IoAddOutline className="text-black" /> }
          onClick={addVehicle}
        />
        </div>
      </div>
    </div>
  );
}

export default VehicleInformation;