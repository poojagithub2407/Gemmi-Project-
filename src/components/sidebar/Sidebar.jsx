import './Siderbar.css';
import { assets } from './../../assets/assets';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
const Sidebar = () => {
     const [extended, setExtended] = useState(false);
     const { onSent, previousPrompt, setRecentPrompt,newChat } = useContext(Context);

 const loadPrompt=async(prompt)=>{
     setRecentPrompt(prompt)
      await onSent(prompt)
 }
     return (
          <div className="sidebar">
               <div className='top'>
                    <img className='menu'
                         src={assets.menu_icon}
                         onClick={() => { setExtended(pre => !pre) }}
                         alt='menu icon' />
                    <div onClick={()=>newChat()} className='new-chat'>
                         <img src={assets.plus_icon}
                              alt='pluse icon' />
                         {extended ? <p>New Chat</p> : null}
                    </div>
                    {extended ? <div className='recent'>
                         <p className='recent-title'>Recent</p>
                         {
                              previousPrompt.map((item, index) => {
                                   return (
                                        <div className='recent-entry' onClick={()=>loadPrompt(item)} key={index}>
                                             <img src={assets.message_icon} alt='message-icon' />
                                             <p>{item}</p>
                                        </div>
                                   )
                              })
                         }

                    </div> : null}

               </div>
               <div className='bottom'>
                    <div className='bottom-item recent-entry'>
                         <img src={assets.question_icon} alt='question icon' />
                         {extended ? <p>Help</p> : null}
                    </div>
                    <div className='bottom-item recent-entry'>
                         <img src={assets.history_icon} alt='history_icon' />
                         {extended ? <p>Acitivity</p> : null}
                    </div> <div className='bottom-item recent-entry'>
                         <img src={assets.setting_icon} alt='setting_icon' />
                         {extended ? <p>Setting</p> : null}
                    </div>
               </div>
          </div>
     )
}

export default Sidebar