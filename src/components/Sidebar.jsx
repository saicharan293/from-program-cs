
import { useState } from "react"
import { Link } from "react-router-dom"
import './Sidebar.css';


function Sidebar({ isMobileMenuOpen, onClose }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const links = [
    { to: "/", label: "Home", short: "H" },
    { to: "/journey", label: "Journey", short: "J" },
    { to: "/csharp", label: "C#", short: "C#" },
    { to: "/program-cs", label: "Program.cs", short: "P" },
    { to: "/dotnet", label: ".NET", short: ".N" },
    { to: "/dotnet-core", label: ".NET Core", short: "NC" },
    { to: "/aspnet-core", label: "ASP.NET Core", short: "AC" },
    { to: "/kestrel", label: "Kestrel", short: "K" },
    { to: "/request-pipeline", label: "Request Pipeline", short: "RP" },
    { to: "/routing", label: "Routing", short: "RO" },
    { to: "/problems", label: "Problem Library", short: "PL" },
  ]

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""} ${isMobileMenuOpen ? "mobile-open" : ""}`}>
      <div className="sidebar-top">
        {!isCollapsed && (
          <p className="sidebar-heading">THE JOURNEY</p>
        )}

        <button
          className="sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Minimize sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Minimize sidebar"}
        >
          {isCollapsed ? "»" : "«"}
        </button>
      </div>

      <div className="sidebar-links">
        <ul style={{paddingLeft: 0, paddingBottom: '3rem'}}>
          {links.map((link) => (
            <li key={link.to}>
              <Link to={link.to} title={link.label} className="sidebar-link-tab" onClick={onClose}>
                <span className="sidebar-short">
                  {link.short}
                </span>

                <span className="sidebar-link-text">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
