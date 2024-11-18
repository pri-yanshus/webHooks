import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavBar() {

    const menuItems = [
        {
          name: "",
          icon: faBars,
          route: "/broadcast",
          onClick: () => navigate("/broadcast"),
        },
        
      ];

      const navigate = useNavigate();
      const location = useLocation(); // Get the current route

    return (
        <div>
            {/* Sidebar w-full md:w-64 fixed*/}
      <aside className=" bg-white text-gray-800 rounded-r-3xl  shadow-xl h-full overflow-y-auto transition-all duration-300">
        <nav className="px-2 md:px-4">
          <ul className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.route; // Check if the current route matches the menu item's route

              return (
                <li key={item.name}>
                  <button
                    onClick={item.onClick}
                    className={`flex flex-col md:flex-row items-center justify-center md:justify-start w-full p-3 rounded-xl transition-all duration-300
                      ${
                        isActive
                          ? "bg-indigo-100 text-indigo-600"
                          : "text-gray-600 hover:bg-gray-100 hover:text-indigo-600"
                      }`}
                    // aria-label={`Go to ${item.name
                    //   .replace(/([A-Z])/g, " $1")
                    //   .trim()}`}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`w-6 h-6 md:mr-3 ${
                        isActive ? "text-indigo-600" : "text-gray-400"
                      }`}
                    />
                    
                    <span className="hidden md:inline text-sm font-medium mt-2 md:mt-0">
                      {item.name.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 ml-16 md:ml-64 overflow-y-auto">
        <Outlet />
      </main>
        </div>
    )
}

export default NavBar
