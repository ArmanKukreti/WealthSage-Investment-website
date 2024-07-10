import { Navbar, Welcome, Footer, Services, Loader } from '../components'


const Landing = () => {

  return (
    <div className='min-h-screen'>
      <div className="gradient-bg-welcome">
        <Navbar/>
        <Welcome/>
      </div>
        <Services/>
        <Footer/>
    </div>
  )
}

export default Landing
