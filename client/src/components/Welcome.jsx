import React, { useContext } from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'

import { Loader } from './'
import Robot  from '../images/robot.png'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'

const Welcome = () => {

  const {currentUser} = useContext(UserContext)
  return (
    <div className='flex w-full justify-center items-center'>
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className='text-3xl sm:text-5xl text-white text-gradient py-1'>
            Your All Time <br /> Wealth Manager
          </h1>
          <p className='text-left mt-5 text-white md:w-9/12 w-11/12 text-base'>
            Manage, Analyze and predict your wealth easily on WealthWise
          </p>
          <button type='button' className='justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:[#2546bd]' >
            {
              currentUser ? <Link to={'/my-dashboard'}><p className='text-white text-base font-semibold'>Create Bucket</p></Link> : <Link to={'/login'}><p className='text-white text-base font-semibold'>Create Bucket</p></Link>
            }
            
          </button>

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>
              Reliability
            </div>
            <div className={`${commonStyles}`}>Security</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>
              Guidance
            </div>

            <div className={`rounded-bl-2xl ${commonStyles}`}>
              Personalized
            </div>
            <div className={`${commonStyles}`}>Low Fees</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>
              AI Enabled
            </div>
          </div>
        </div>


        {/* Nice Image */}
        {/* <div className="flex flex-col flex-1 items-center justify-start sm:w-72 w-full mf:mt-0 mt-10 ml-20">
        <div className="p-3 rounded-xl w-full my-5">
            <img src={Robot} alt="Hero" className='w-full'/>
          </div>
        </div>  */}

      </div>
    </div>
  )
}

export default Welcome
