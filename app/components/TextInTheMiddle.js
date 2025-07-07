const TextInTheMiddle = ({text, color}) => (
        <div className={`flex items-center justify-center w-full h-full font-raleway font-normal`}>
            <div className="flex-grow border-[1px] border-greyforline"></div>
            <div className={`text-${color} text-sm`}>{text}</div>
            <div className="flex-grow border-[1px] border-greyforline"></div>
        </div>
    );

export default TextInTheMiddle;
