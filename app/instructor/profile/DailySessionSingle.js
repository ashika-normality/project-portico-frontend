import LabeledInput from '@/app/components/LabeledInput';
import LabeledTimePicker from '@/app/components/LabeledTimePicker';
import { useFormContext } from 'react-hook-form';
import { BsTrashFill } from "react-icons/bs";
import { LuCopy, LuPlus } from "react-icons/lu";
import { useEffect, useState } from 'react';
import CopyScheduleDays from './CopyScheduleDays';
import { toast } from 'react-hot-toast';

function DailySessionSingle({ requiredOn = false, dayIndex, sessionIndex, removeSession, onAddSession, onTimeChange, currentDay }) {

  const [showCopyDay, setShowCopyDay] = useState(false);

  const { register, setValue, watch } = useFormContext();

  const labelField = `availability.${dayIndex}.sessions.${sessionIndex}.label`;
  const startTimeField = `availability.${dayIndex}.sessions.${sessionIndex}.startTime`;
  const endTimeField = `availability.${dayIndex}.sessions.${sessionIndex}.endTime`;

  const sessions = watch(`availability.${dayIndex}.sessions`) || [];
  const startTime = watch(startTimeField);
  const endTime = watch(endTimeField);

  const canRemove = sessions.length > 1;
  
  // Check if both start and end times are provided
  const isTimeValid = startTime && endTime;

  useEffect(() => {
    if (startTime && endTime) {
      onTimeChange();
    }
  }, [startTime, endTime]); // check when times change

  const handleShowCopy = () => {
    if (!isTimeValid) return; // Prevent opening if times are invalid
    setShowCopyDay(true);
  };

  const handleCloseCopy = () => {
    setShowCopyDay(false);
  };

  // Copy session to selected days
  const handleCopySession = (selectedDays) => {
    const sessionToCopy = sessions[sessionIndex];
    if (!sessionToCopy) return;

    selectedDays.forEach((targetDayId) => {
      // Find index of target day
      const targetDayIndex = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].indexOf(targetDayId);
      if (targetDayIndex === -1) return;

      // Get current sessions for target day
      const targetSessions = watch(`availability.${targetDayIndex}.sessions`) || [];
      // Add the session to target day
      setValue(`availability.${targetDayIndex}.sessions`, [{ ...sessionToCopy }, ...targetSessions]);
      setValue(`availability.${targetDayIndex}.enabled`, true); // Enable the day if not already
    });

    toast.success("Session copied to selected days!");
  };

  return (
    <div className='p-4 w-full rounded-lg bg-[#F7F7F7] flex flex-col md:flex-row space-x-4 justify-center items-center space-y-3 md:space-y-0'>
      <LabeledInput
        type='text'
        name={labelField}
        label='Name'
        placeholder={`Session ${sessionIndex + 1}`}
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
            required = {requiredOn}
          />   
          <span>
            <div className='mt-6 w-3 border-1 border-tonedblack'></div>
          </span> 
          <LabeledTimePicker
            name={endTimeField}
            label='End Time'
            register={register}
            setValue={setValue}
            required = {requiredOn}
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
            className={`cursor-pointer relative ${!isTimeValid ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleShowCopy}
            disabled={!isTimeValid}
            title={!isTimeValid ? "Please set both start and end times" : "Copy schedule to other days"}
          >
            <LuCopy  color='#FF7000' size={20}/>
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
      {showCopyDay && (
        <CopyScheduleDays
          onClose={handleCloseCopy}
          currentDay={currentDay}
          onCopy={handleCopySession}
        />
      )}
    </div>
  );
}

export default DailySessionSingle;