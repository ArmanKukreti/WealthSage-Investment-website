import React, { useContext, useEffect, useState } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import { Navbar } from '../components';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import Investment from '../components/Investment';

const Dashboard = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [investmentData, setInvestmentData] = useState([]);
  const [baskets, setBaskets] = useState([]);
  const [selectedBasket, setSelectedBasket] = useState(null);
  const [basketName, setBasketName] = useState('')

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <Navbar mode="light" />
      <div className='flex flex-row items-center'>
        <LeftSidebar 
          setBasketName = {setBasketName}
          setInvestmentData={setInvestmentData} 
          setBaskets={setBaskets} 
          setSelectedBasket={setSelectedBasket}
          selectedBasket={selectedBasket}
          baskets={baskets}
        />
        <div className='w-full grid place-content-center'>
          <Investment 
            basketName = {basketName}
            investmentData={investmentData} 
            baskets={baskets} 
            selectedBasket={selectedBasket}
          />
        </div>
        {/* <AIPage/> */}
      </div>
    </div>
  );
};

export default Dashboard;
