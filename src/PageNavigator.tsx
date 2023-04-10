import {Routes, Route} from 'react-router'
import MainPage from './Pages/MainPage'
import PostDetailPage from './Pages/PostDetailPage'
import PostWritePage from './Pages/PostWritePage'
import MyPage from './Pages/MyPage'
import MessagePage from './Pages/MessagePage'

export default function PageNavigator() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/PostWrite' element={<PostWritePage />} />
      <Route path='/PostDetail' element={<PostDetailPage />} />
      <Route path='/MyPage' element={<MyPage />} />
      <Route path='/Message' element={<MessagePage />} />
    </Routes>
  )
}
