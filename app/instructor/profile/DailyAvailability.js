import { useEffect, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import DailySessionSingle from './DailySessionSingle';
import { IoWarningOutline } from 'react-icons/io5';

function DailyAvailability({ day, dayIndex, sessions, enabled, register, setValue }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingChangeIndex, setPendingChangeIndex] = useState(null); // Track which session triggered the change

  const handleToggleEnabled = (e) => {
    setValue(`availability.${dayIndex}.enabled`, e.target.checked);
  };

  const addSession = () => {
    const newSessions = [...sessions, { label: '', startTime: '', endTime: '' }];
    setValue(`availability.${dayIndex}.sessions`, newSessions);

    // Trigger overlap check after next render when DOM updates
    setTimeout(() => {
      const newIndex = newSessions.length - 1;
      const overlapIdx = findOverlapIndex(newSessions, newIndex);
      if (overlapIdx !== -1) {
        setPendingChangeIndex(newIndex);
        setShowConfirmation(true);
      }
    }, 0);
  };

  const removeSession = (indexToRemove) => {
    if (sessions.length <= 1) return;
    const newSessions = sessions.filter((_, i) => i !== indexToRemove);
    setValue(`availability.${dayIndex}.sessions`, newSessions);
  };

  const updateSession = (index, field, value) => {
    const newSessions = sessions.map((s, i) =>
      i === index ? { ...s, [field]: value } : s
    );
    setValue(`availability.${dayIndex}.sessions`, newSessions);

    // Check for overlap after change
    const overlapIdx = findOverlapIndex(newSessions, index);
    if (overlapIdx !== -1) {
      setPendingChangeIndex(index);
      setShowConfirmation(true);
    }
  };

  // Called when user confirms: keep new session, remove old overlapping one
  const handleConfirm = () => {
    const newSessions = [...sessions];
    const overlapIdx = findOverlapIndex(newSessions, pendingChangeIndex);

    if (overlapIdx !== -1 && pendingChangeIndex !== null) {
      // Remove the **overlapping old session**, NOT the new one
      const finalSessions = newSessions.filter((_, i) =>
        i === overlapIdx && i !== pendingChangeIndex ? false : true
      );

      setValue(`availability.${dayIndex}.sessions`, finalSessions);
      toast.success(`Session updated: kept new, removed conflict`, { id: `${day}-overlap` });
    }

    // Reset state
    setShowConfirmation(false);
    setPendingChangeIndex(null);
  };

  // Called when user cancels: remove the new session, keep the old one
  const handleCancel = () => {
    if (pendingChangeIndex === null) {
      setShowConfirmation(false);
      setPendingChangeIndex(null);
      return;
    }

    const finalSessions = sessions.filter((_, i) => i !== pendingChangeIndex);
    setValue(`availability.${dayIndex}.sessions`, finalSessions);
    toast.success(`Discarded conflicting session`, { id: `${day}-overlap` });

    setShowConfirmation(false);
    setPendingChangeIndex(null);
  };

  return (
    <div className="border-b border-greyforline py-4">
      <div className="flex flex-col items-start md:flex-row w-full space-y-4 md:space-y-0 space-x-4">
        {/* Day checkbox */}
        <div className="flex w-1/9 items-center space-x-2 md:mt-8">
          <input
            type="checkbox"
            {...register(`availability.${dayIndex}.enabled`)}
            checked={enabled}
            onChange={handleToggleEnabled}
            className="form-checkbox rounded-sm mr-2 hover:cursor-pointer"
            style={{ zoom: '120%' }}
          />
          <label>{day}</label>
        </div>

        {/* Sessions list */}
        <div className="w-full flex flex-col flex-grow space-y-4">
          {sessions.map((session, i) => (
            <DailySessionSingle
              key={i}
              dayIndex={dayIndex}
              sessionIndex={i}
              register={register}
              removeSession={() => removeSession(i)}
              onAddSession={addSession}
              sessions={sessions}
              setValue={setValue}
              onTimeChange={(field, value) => updateSession(i, field, value)}
            />
          ))}

          {/* Confirmation Popup */}
          {showConfirmation && (
            <OverlapConfirmationPopup
              day={day}
              handleClose={handleCancel}
              handleConfirmation={handleConfirm}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DailyAvailability;

// 🔹 Find index of session that overlaps with the given `changedIndex` session
function findOverlapIndex(sessions, changedIndex) {
  if (changedIndex === null || changedIndex >= sessions.length) return -1;

  const changed = sessions[changedIndex];
  const changedStart = convertToMinutes(changed.startTime);
  const changedEnd = convertToMinutes(changed.endTime);

  if (changedStart === null || changedEnd === null) return -1;

  for (let i = 0; i < sessions.length; i++) {
    if (i === changedIndex) continue;

    const s = sessions[i];
    const start = convertToMinutes(s.startTime);
    const end = convertToMinutes(s.endTime);

    if (start === null || end === null) continue;

    // Check for overlap: [changedStart, changedEnd) vs [start, end)
    if (changedStart < end && start < changedEnd) {
      return i; // return index of the **existing** overlapping session
    }
  }
  return -1;
}

function convertToMinutes(timeStr) {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(':').map(Number);
  if (isNaN(h) || isNaN(m)) return null;
  return h * 60 + m;
}

// ✅ Optimized Confirmation Popup
const OverlapConfirmationPopup = ({ day, handleClose, handleConfirmation }) => {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="overlap-title"
      aria-describedby="overlap-desc"
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 id="overlap-title" className="text-xl font-bold text-primary flex items-center">
          <IoWarningOutline className="text-red-500 mr-2" size={24} />
          Schedule Overlap
        </h2>

        <p id="overlap-desc" className="text-gray-700 mt-4 mb-6">
          The new session on <strong>{day}</strong> overlaps with an existing session.
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={handleClose}
          >
            Discard New
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-footerorange focus:outline-none focus:ring-0"
            onClick={handleConfirmation}
            data-confirm-button
          >
            Keep New
          </button>
        </div>
      </div>
    </div>
  );
};