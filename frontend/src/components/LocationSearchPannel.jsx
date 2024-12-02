import React from 'react';

const LocationSearchPanel = (props) => {    
    const location = [
        "123 Main Street, Theni, Tamil Nadu, 625531",
        "456 South Street, Theni, Tamil Nadu, 625531",
        "789 Muthur Road, Theni, Tamil Nadu, 625531",
        "101 Gandhi Road, Theni, Tamil Nadu, 625531",
        "202 Bypass Road, Theni, Tamil Nadu, 625531"
    ];

    return (
        <div>
            {/* Display Sample Suggestions */}
            {
                location.map((elem, idx) => (
                    <div
                        key={idx}
                        className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer'
                        onClick={() => {
                            props.setIsVehiclePanelOpen(true);
                            props.setIsPanelOpen(false);
                            console.log(`Selected location: ${elem}`); // Optional for debugging
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Select ${elem}`}
                    >
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                            <i className="ri-map-pin-fill"></i>
                        </h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                ))
            }
        </div>
    );
};

export default LocationSearchPanel;
