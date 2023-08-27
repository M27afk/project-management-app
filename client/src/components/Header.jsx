import logo from "../assets/logo.png";

export default function Header() {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex align-items-center gap-3 justify-content-around">
            <img src={logo} height={50} alt="logo" />
            <div>
              <h1>Project Management</h1>
            </div>
          </div>
        </a>
      </div>
    </nav>
  );
}
