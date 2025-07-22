import { Spinner } from "@heroui/spinner";
const SpinnerComponent = ({text}) => {
    return(
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex flex-col items-center space-y-4">
              <Spinner size="lg" color="primary" />
              <p className="text-gray-700 font-medium">
                {text || "Loading... Please wait."}
              </p>
            </div>
          </div>
        </div>
    )
}

export default SpinnerComponent;