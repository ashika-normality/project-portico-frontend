import LabeledSelect from "@/app/components/LabeledSelect";
function CopyWeeklySchedule({}) {
    return (
        <div className="flex flex-col md:flex-row w-full bg-white rounded-xl shadow-equal p-8 space-y-8 space-x-12">
           <div className="w-full">
             <h1 className="text-primary text-lg font-bold font-raleway">Copy Schedule</h1>
                <div className="w-full mt-4 flex flex-col space-y-3">
                    <div>
                        <LabeledSelect
                            name='repeatWeeks'
                            label=''
                            options={[
                                {label: 'Next Week', value: 1},
                                {label: 'Next 2 Weeks', value: 2},
                                {label: 'Next 3 Weeks', value: 3},
                                {label: 'Next 4 Weeks', value: 4},
                                {label: 'Next 5 Weeks', value: 5},
                                {label: 'Next 6 Weeks', value: 6},
                                {label: 'Next 7 Weeks', value: 7},
                                {label: 'Next 8 Weeks', value: 8},
                                {label: 'Next 9 Weeks', value: 9},
                                {label: 'Next 10 Weeks', value: 10},
                                {label: 'Next 11 Weeks', value: 11},
                                {label: 'Next 12 Weeks', value: 12},
                            ]}
                        />
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <input type="checkbox" name="includeExistingBookings" 
                            className="form-checkbox rounded-sm mr-2 hover:cursor-pointer outline-none checked:focus:outline-none focus:outline-none focus:ring-0  hover:bg-primary checked:bg-primary checked:hover:bg-primary checked:focus:bg-primary" 
                            style={{zoom: "120%"}} 
                        />
                        <label htmlFor="includeExistingBookings" className="text-tonedblack">Include Existing Bookings</label>
                    </div>
                </div>
           </div>
        </div>
    );
}

export default CopyWeeklySchedule;