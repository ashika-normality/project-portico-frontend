import LabeledInput from '@/app/components/LabeledInput';
import LabeledTimePicker from '@/app/components/LabeledTimePicker';
import { useFormContext } from 'react-hook-form';
import { BsTrashFill } from "react-icons/bs";
import { LuCopy } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";

function DailySessionSingle({ 
    sessionId, 
    sessionIndex, 
    day, 
    onAddSession, 
    onRemoveSession, 
    onDuplicateSession, 
    canRemove 
}) {
    const { register, setValue } = useFormContext();

    const handleAddSession = () => {
        onAddSession();
    };

    const handleRemoveSession = () => {
        if (canRemove) {
            onRemoveSession(sessionId);
        }
    };

    const handleDuplicateSession = () => {
        onDuplicateSession(sessionId);
    };

    // Create unique field names for each session
    const sessionNameField = `${day}_session_${sessionIndex}_name`;
    const startTimeField = `${day}_session_${sessionIndex}_startTime`;
    const endTimeField = `${day}_session_${sessionIndex}_endTime`;

    return (
        <div className='p-4 w-full rounded-xl bg-[#F7F7F7] flex flex-col md:flex-row space-x-4 justify-center items-center space-y-3 md:space-y-0'>
            <LabeledInput
                type='text'
                name={sessionNameField}
                label='Name'
                placeholder='Morning Session'
                register={register}
                setValue={setValue}
                required
                style={{ bgColor: 'white' }}
            />
            <div className='w-full flex justify-between items-center'>
                <div className='w-full flex space-x-3 justify-between items-center'>
                    <LabeledTimePicker
                        name={startTimeField}
                        label='Start Time'
                        register={register}
                        setValue={setValue}
                        required
                    />   
                    <span>
                        <div className='mt-6 w-3 border-1 border-tonedblack'></div>
                    </span> 
                    <LabeledTimePicker
                        name={endTimeField}
                        label='End Time'
                        register={register}
                        setValue={setValue}
                        required
                    />
                </div>  
                <div className='px-4 flex space-x-4 md:space-x-9 justify-between items-center mt-6'>
                    <button 
                        type="button"
                        className={`cursor-pointer ${!canRemove ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleRemoveSession}
                        disabled={!canRemove}
                    >
                        <BsTrashFill color='#FF7000' size={20} />
                    </button>
                    <button 
                        type="button"
                        className='cursor-pointer'
                        onClick={handleDuplicateSession}
                    >
                        <LuCopy color='#FF7000' size={20} />
                    </button>
                    <button 
                        type="button"
                        className='cursor-pointer'
                        onClick={handleAddSession}
                    >
                        <LuPlus color='#FF7000' size={20} />
                    </button>
                </div>   
            </div>
        </div>
    );
}

export default DailySessionSingle;