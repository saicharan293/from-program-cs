import React, { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Sidebar from './components/Sidebar'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
// import PlaceholderPage from './pages/PlaceholderPage'
import Journey from './pages/Journey/Journey'
import ProgramCs from './pages/ProgramCs/ProgramCs'
import Kestrel from './pages/Kestrel/Kestrel'
import CSharp from './pages/CSharp/CSharp'
import DotNet from './pages/DotNet/DotNet'
import DotNetCore from './pages/DotNetCore/DotNetCore'
import AspNetCore from './pages/AspNetCore/AspNetCore'
import RequestPipeline from './pages/RequestPipeline/RequestPipeline'
import Routing from './pages/Routing/Routing'
import ProblemLibrary from './pages/ProblemLibrary/ProblemLibrary'

const App = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className='app'>
      <Navbar onMenuClick={()=> setIsMobileMenuOpen(true)}/>

      <div className="page-layout">
        <Sidebar isMobileMenuOpen= {isMobileMenuOpen} onClose={()=>setIsMobileMenuOpen(false)}/>
        {isMobileMenuOpen && (
          <div className="mobile-sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}/>
        )}
        <main className="main-content">
          <Routes >
            <Route path="/" element={<Home />}/>
            <Route path="/journey" element={<Journey />} />
            <Route path="/program-cs" element={<ProgramCs />} />
            <Route path="/csharp" element={<CSharp />} />
            <Route path="/dotnet" element={<DotNet />} />
            <Route path="/dotnet-core" element={<DotNetCore />} />
            <Route path="/aspnet-core" element={<AspNetCore />} />
            <Route path="/kestrel" element={<Kestrel />} />
            <Route path="/request-pipeline" element={<RequestPipeline />} />
            <Route path="/routing" element={<Routing />} />
            <Route path="/problems" element={<ProblemLibrary />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App