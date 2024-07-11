'use client'
import './assets/home.css'
import {useRouter} from "next/navigation";
import Footer from './components/footer';

export const fetchCache = 'force-no-store';

export default function Home() {
  const router = useRouter();

  const routeLogin = () => {
    router.push("/api/login")
  };

  return (
    <main>
      <button className="login-btn" id="b1" onClick={routeLogin}>Log in</button>
      <div className="header">
        <h1>TuneIn</h1>
        <h2>Spotify Music Dashboard</h2>
        <p className="login-desc">Log in to get started</p>
        <p className="login-desc-p">(**Please note this app is currently in development mode. <br></br>For access, please contact me at tangpauline1@gmail if interested**)</p>
        <button className="login-btn" id="b2" onClick={routeLogin}>Log in</button>
      </div>
      <Footer></Footer>
    </main>
  );
}
