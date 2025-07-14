import { useState } from "react";
import { useAppContext } from "@/app/components/AppContext";
import LabeledDatePicker from "@/app/components/LabeledDatePicker";
import LabeledInput from "@/app/components/LabeledInput";
import LabeledSelect from "@/app/components/LabeledSelect";
import LabeledFileUpload from "@/app/components/LabeledFileUpload";
import TextInTheMiddle from "@/app/components/TextInTheMiddle";

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

function VehicleForm({ vehicle, onChange, countries }) {
  return (
    <div className="w-full flex flex-col space-y-3 pb-4 mb-4">
      <div className="w-full flex space-x-3">
        <div className="w-1/2">
          <LabeledInput
            label="Make"
            name="make"
            value={vehicle.make}
            onChange={e => onChange({ ...vehicle, make: e.target.value })}
            required={true}
          />
        </div>
        <div className="w-1/2">
          <LabeledInput
            label="Model"
            name="model"
            value={vehicle.model}
            onChange={e => onChange({ ...vehicle, model: e.target.value })}
            required={true}
          />
        </div>
      </div>
      <div className="w-full flex space-x-3">
        <div className="w-1/2">
          <LabeledInput
            label="Registration Number"
            name="registrationNumber"
            value={vehicle.registrationNumber}
            onChange={e => onChange({ ...vehicle, registrationNumber: e.target.value })}
            required={true}
          />
        </div>
        <div className="w-1/2">
          <LabeledInput
            label="Year of Manufacturing"
            name="yearOfManufacturing"
            value={vehicle.yearOfManufacturing}
            onChange={e => onChange({ ...vehicle, yearOfManufacturing: e.target.value })}
            required={true}
            type="number"
            placeholder="YYYY"
          />
        </div>
      </div>
      <div className="w-full flex space-x-3">
        <div className="w-1/2">
          <LabeledSelect
            label="Vehicle Type"
            name="vehicleType"
            value={vehicle.vehicleType}
            onChange={e => onChange({ ...vehicle, vehicleType: e.target.value })}
            options={vehicleTypes}
            required={true}
            setValue={() => {}}
          />
        </div>
        <div className="w-1/2">
          <LabeledSelect
            label="Transmission Type"
            name="transmissionType"
            value={vehicle.transmissionType}
            onChange={e => onChange({ ...vehicle, transmissionType: e.target.value })}
            options={transmissionTypes}
            required={true}
            setValue={() => {}}
          />
        </div>
      </div>
      <div className="w-full flex space-x-3">
        <div className="w-1/2">
          <LabeledSelect
            label="Vehicle Country of Origin"
            name="countryOfOrigin"
            value={vehicle.countryOfOrigin}
            onChange={e => onChange({ ...vehicle, countryOfOrigin: e.target.value })}
            options={countries.map(c => ({ value: c.iso2, label: c.name }))}
            required={true}
            setValue={() => {}}
          />
        </div>
        <div className="w-1/2">
          <LabeledSelect
            label="Fuel Type"
            name="fuelType"
            value={vehicle.fuelType}
            onChange={e => onChange({ ...vehicle, fuelType: e.target.value })}
            options={fuelTypes}
            required={true}
            setValue={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

function VehicleInformation() {
  const { countries } = useAppContext();
  const [vehicles, setVehicles] = useState([
    {
      make: "",
      model: "",
      registrationNumber: "",
      yearOfManufacturing: "",
      vehicleType: "",
      transmissionType: "",
      countryOfOrigin: "",
      fuelType: "",
    },
  ]);

  const handleVehicleChange = (idx, updatedVehicle) => {
    setVehicles(vehicles => vehicles.map((v, i) => (i === idx ? updatedVehicle : v)));
  };

  const addVehicle = () => {
    setVehicles([
      ...vehicles,
      {
        make: "",
        model: "",
        registrationNumber: "",
        yearOfManufacturing: "",
        vehicleType: "",
        transmissionType: "",
        countryOfOrigin: "",
        fuelType: "",
      },
    ]);
  };

  return (
    <div className="flex flex-col w-full bg-white rounded-xl shadow-equal p-8 space-y-4">
      <h1 className="text-tonedblack text-lg font-bold font-raleway">Vehicle Information</h1>
      {vehicles.map((vehicle, idx) => (
        <>
            {idx > 0 && <TextInTheMiddle text={`Vehicle ${idx+1}`}  />}
            <VehicleForm
                key={idx}
                vehicle={vehicle}
                onChange={updated => handleVehicleChange(idx, updated)}
                countries={countries}
            />
        </>
      ))}
      <button
        type="button"
        className="w-full mt-2 p-2 bg-primary text-white rounded-md font-bold hover:bg-primary-overlay transition"
        onClick={addVehicle}
      >
        Add Another Vehicle
      </button>
    </div>
  );
}

export default VehicleInformation;