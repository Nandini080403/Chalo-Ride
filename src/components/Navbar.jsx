import { Link } from "react-router-dom";

let user = null;

try {

  const storedUser =
    localStorage.getItem("user");

  if (
    storedUser &&
    storedUser !== "undefined"
  ) {

    user =
      JSON.parse(storedUser);

  }

} catch (error) {

  console.log(
    "Invalid user data"
  );

}

export default function Navbar() {
  return (
    <nav className="w-full border-b border-slate-200 bg-white sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-7 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
            🛵
          </div>

          <h1 className="text-xl font-bold">
            <span className="text-indigo-500">
              Chalo
            </span>

            <span className="text-pink-500">
              Ride
            </span>
          </h1>

        </Link>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-6 text-base font-medium text-slate-700">

          <Link to="/" className="text-indigo-500 border-b-2 border-pink-400 pb-1">
            Home
          </Link>

          <Link to="/find-ride">
            Find Ride
          </Link>

          <Link to="/offer-ride">
            Offer Ride
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/legal">Legal</Link>

        </div>

        {/* BUTTONS */}
        {/* RIGHT SIDE */}
        <div className="flex items-center gap-8">

          {user ? (

            <>
    
              {/* REQUESTS */}
              <Link
                to="/requests"
              >

                <button className="font-medium text-slate-700 hover:text-indigo-500">

                  Requests

                </button>

              </Link>

              {/* PROFILE ICON */}
              <Link
                to="/profile"
              >

                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-[14px] cursor-pointer hover:scale-105 duration-300">

                  {
                    user.name
                      ?.charAt(0)
                      ?.toUpperCase()
                  }

                </div>

              </Link>

            </>

          ) : (

            <>

              <Link to="/login">

                <button className="font-medium">

                  Login

                </button>

              </Link>

              <Link to="/signup">

                <button className="bg-indigo-500 text-white px-7 py-5 rounded-xl font-medium hover:scale-105 duration-300">

                  Sign Up

                </button>

              </Link>

            </>

          )}

        </div>

      </div>

    </nav>
  );
}