import Header from '../components/Header'
import ChatBox from '../components/Chatbox'
import Footer from '../components/Footer'

function ChatPage() {
  return (
    <div className='flex flex-col h-screen'> 
        <Header />
        <ChatBox />
        <Footer />
    </div>
  )
}

export default ChatPage