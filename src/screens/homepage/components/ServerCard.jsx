import React from "react";

const ServerCard = ({name, price, duration}) => {
    return (
        <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1 text-xs">
                           Buy VIP on INDINET GAMING's
                            <h5 className="text-amber-500 uppercase font-semibold text-xl">
                                {name}
                            </h5>
                            <span className="font-light text-xl text-red-700">
                                 {price} INR
                            </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                                <i className="far fa-chart-bar"></i>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-blueGray-400 mt-4">
                    Valid for
                        <span className="text-red-500 mr-2">
                            <i className="fas fa-arrow-up"></i> {duration}
                        </span>
                        <span className="whitespace-nowrap">
                            days
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ServerCard