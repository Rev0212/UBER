import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import LocationSearchPannel from '../components/LocationSearchPannel';
import VehiclePanel from '../components/VehiclePannel';
import ConfirmedRidePannel from '../components/ConfirmedRidePannel';
import LookingForDriverPannel from '../components/LookingForDriverPannel';
import WaitingForDriverPannel from '../components/WaitingForDriverPannel';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  const [isPannelOpen, setIsPannelOpen] = useState(false);
  const [isVehiclePanelOpen, setIsVehiclePanelOpen] = useState(false);
  const [isConfirmedRidePanelOpen, setIsConfirmedRidePanelOpen] = useState(false);
  const [isLookingForDriverPanelOpen, setIsLookingForDriverPanelOpen] = useState(false)
  const [isWaitingForDriverPanelOpen, setisWaitingForDriverPanelOpen] = useState(false)

  const pannelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmedRidePanelRef = useRef(null);
  const lookingForDriverPanelRef = useRef(null);
  const waitingForDriverPanelRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
  };

  // GSAP animation for the pickup/destination panel
  useEffect(() => {
    if (isPannelOpen) {
      gsap.to(pannelRef.current, { height: '70%' });
    } else {
      gsap.to(pannelRef.current, { height: '0%' });
    }
  }, [isPannelOpen]);

  // GSAP animation for the vehicle panel
  useEffect(() => {
    if (isVehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(vehiclePanelRef.current, { transform: 'translateY(100%)' });
    }
  }, [isVehiclePanelOpen]);

  // GSAP animation for the confirmed ride panel
  useEffect(() => {
    if (isConfirmedRidePanelOpen) {
      gsap.to(confirmedRidePanelRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(confirmedRidePanelRef.current, { transform: 'translateY(100%)' });
    }
  }, [isConfirmedRidePanelOpen]);


  //GSAP animation for the Looking for driver pannel
  useEffect(() => {
    if (isLookingForDriverPanelOpen) {
      gsap.to(lookingForDriverPanelRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(lookingForDriverPanelRef.current, { transform: 'translateY(100%)' });
    }
  }, [isLookingForDriverPanelOpen]);


  //GSAP animation for Waiting For Driver Pannel

  useEffect(() => {
    if (isWaitingForDriverPanelOpen) {
      gsap.to(waitingForDriverPanelRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(waitingForDriverPanelRef.current, { transform: 'translateY(100%)' });
    }
  }, [isWaitingForDriverPanelOpen]);


  return (
    <div className='h-screen relative overflow-hidden'>
      <img
        className='w-16 absolute left-5 top-5'
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s'
        alt='Logo'
      />
      <div className='h-screen w-screen'>
        <img
          className='h-full w-full object-cover'
          src='https://cdn.theatlantic.com/thumbor/9o5OxuWCAaGrA19A-LW0MlKj_u8=/0x48:1231x740/976x549/media/img/mt/2017/04/IMG_7105/original.png'
          alt='Background'
        />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-5 bg-white relative'>
        <h5
          ref={pannelRef}
          className={`absolute right-6 top-6 text-2xl ${
            pannelRef.current ? 'opacity-1' : 'opacity-0'
        }`}
          onClick={() => {
            setIsPannelOpen(false);
          }}
          
        >
            <i className="ri-arrow-down-wide-line"></i>
        </h5>

          <h4 className='text-2xl font-semibold'>Find a Trip</h4>
          <form onSubmit={submitHandler}>
            <div className='line absolute h-16 w-1 top-[30%] left-8 bg-gray-800'></div>
            <input
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3'
              type='text'
              placeholder='Add a pickup Location'
              value={pickup}
              onClick={() => setIsPannelOpen(true)}
              onChange={(e) => setPickup(e.target.value)}
            />
            <input
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3'
              type='text'
              placeholder='Enter your destination'
              value={destination}
              onClick={() => setIsPannelOpen(true)}
              onChange={(e) => setDestination(e.target.value)}
            />
          </form>
        </div>
        <div ref={pannelRef} className='h-0 bg-white'>
          <LocationSearchPannel
            setIsPanelOpen={setIsPannelOpen}
            setIsVehiclePanelOpen={setIsVehiclePanelOpen}
          />
        </div>
        <div
          ref={vehiclePanelRef}
          className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'
        >
          <VehiclePanel
            setIsVehiclePanelOpen={setIsVehiclePanelOpen}
            setIsConfirmedRidePanelOpen={setIsConfirmedRidePanelOpen}
          />
        </div>
        <div
          ref={confirmedRidePanelRef}
          className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'
        >
          <ConfirmedRidePannel setIsLookingForDriverPanelOpen={setIsLookingForDriverPanelOpen} setIsConfirmedRidePanelOpen={setIsConfirmedRidePanelOpen} />
        </div>
        <div
          ref={lookingForDriverPanelRef}
          className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'
        >
          <LookingForDriverPannel/>
        </div>
        <div
          ref={waitingForDriverPanelRef}
          className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'
        >
          <WaitingForDriverPannel isWaitingForDriverPanelOpen={isWaitingForDriverPanelOpen}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
