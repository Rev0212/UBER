import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopup';
import ConfirmRidePopUp from '../components/ConfirmRidePopup';

const CaptainHome = () => {
  const [isRidePopupPanelOpen, setIsRidePopupPanelOpen] = useState(true);
  const [isConfirmRidePopupPanelOpen, setIsConfirmRidePopupPanelOpen] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  useEffect(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: isRidePopupPanelOpen ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [isRidePopupPanelOpen]);

  useEffect(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: isConfirmRidePopupPanelOpen ? 'translateY(0)' : 'translateY(100%)',
    });
  }, [isConfirmRidePopupPanelOpen]);

  return (
    <div className='h-screen overflow-hidden'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img
          className='w-16'
          src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
          alt='Uber Logo'
        />
        <Link
          to='/captain-home'
          className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img
          className='h-full w-full object-cover'
          src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif'
          alt='Background'
        />
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <RidePopUp
          setIsRidePopupPanelOpen={setIsRidePopupPanelOpen}
          setIsConfirmRidePopupPanelOpen={setIsConfirmRidePopupPanelOpen}
        />
      </div>
      <div ref={confirmRidePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopUp
          setIsRidePopupPanelOpen={setIsRidePopupPanelOpen}
          setIsConfirmRidePopupPanelOpen={setIsConfirmRidePopupPanelOpen}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
