import React from 'react'
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

const App = () => {
  return (
    <div className='app'>
      <Navbar />

      <div className="page-layout">
        <Sidebar />
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
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App