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
      <button id="b1" onClick={routeLogin}>Log in</button>
      <div className="header">
        <h1>TuneIn</h1>
        <h2>Spotify Music Dashboard</h2>
        <p>Log in to get started</p>
        <button id="b2" onClick={routeLogin}>Log in</button>
      </div>
      <Footer></Footer>
    </main>
  );
}
