'use client'
import './assets/home.css'
import {useRouter} from "next/navigation";
import Footer from './components/footer';
import Modal from 'react-modal';
import {useState} from 'react';

export const fetchCache = 'force-no-store';

// modal styling
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFD0EC',
    color: '#474F7A',
    textAlign: 'center',
    borderRadius: '20px',
    boxShadow: "0px 0px 40px #474F7A",
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
};

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setModalIsOpen(true);
  }

  const routeLogin = () => {
    router.push("/api/login");
  };

  return (
    <main>
      <div className="header">
        <h1>TuneIn</h1>
        <h2>Spotify Music Dashboard</h2>
        <p className="login-desc">Log in to get started</p>
        <button className="login-btn" id="b2" onClick={openModal}>Log in</button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => {setModalIsOpen(false)}}
          style={customStyles}
          ariaHideApp={false}
        >
          <p>Please note this app is currently in development mode. <br></br>For access, please contact me at <strong>tangpauline1@gmail</strong> if interested. <br></br>Sorry for the inconvenience!</p>
          <button className="back-btn" onClick={() => {setModalIsOpen(false)}}>Back</button>
          <button className="proceed-btn" onClick={routeLogin}>Proceed</button>
        </Modal>
      </div>
      <Footer></Footer>
    </main>
  );
}
