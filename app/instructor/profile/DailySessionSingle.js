import LabeledInput from '@/app/components/LabeledInput';
import LabeledTimePicker from '@/app/components/LabeledTimePicker';
import { useFormContext } from 'react-hook-form';
import { BsTrashFill } from "react-icons/bs";
import { LuCopy, LuPlus } from "react-icons/lu";
import { useEffect } from 'react';

function DailySessionSingle({ dayIndex, sessionIndex, removeSession, onAddSession, onDuplicateSession, onTimeChange }) {
  const { register, setValue, watch } = useFormContext();

  const labelField = `availability.${dayIndex}.sessions.${sessionIndex}.label`;
  const startTimeField = `availability.${dayIndex}.sessions.${sessionIndex}.startTime`;
  const endTimeField = `availability.${dayIndex}.sessions.${sessionIndex}.endTime`;

  const sessions = watch(`availability.${dayIndex}.sessions`) || [];
  const startTime = watch(startTimeField);
  const endTime = watch(endTimeField);

  const canRemove = sessions.length > 1;

  useEffect(() => {
    if (startTime && endTime) {
      onTimeChange();
    }
  }, [startTime, endTime]); // check when times change

  return (
    <div className='p-4 w-full rounded-lg bg-[#F7F7F7] flex flex-col md:flex-row space-x-4 justify-center items-center space-y-3 md:space-y-0'>
      <LabeledInput
        type='text'
        name={labelField}
        label='Name'
        placeholder='Morning Session'
        register={register}
        setValue={setValue}
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
            onClick={() => canRemove && removeSession(sessionIndex)}
            disabled={!canRemove}
          >
            <BsTrashFill color='#FF7000' size={20} />
          </button>
          <button 
            type="button"
            className='cursor-pointer'
          >
            <LuCopy color='#FF7000' size={20} />
          </button>
          <button 
            type="button"
            className='cursor-pointer'
            onClick={onAddSession}
          >
            <LuPlus color='#FF7000' size={20} />
          </button>
        </div>   
      </div>
    </div>
  );
}

export default DailySessionSingle;
