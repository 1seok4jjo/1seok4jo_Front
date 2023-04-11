// Chat
export interface ChatBubbleProps {
  text: string
}
export interface Props {}

// ChatBubble
export interface SpeechBubbleProps {
  text: string
  position: 'left' | 'right'
  isUser: boolean
}
export interface MyComponentState {
  speechBubbleProps: SpeechBubbleProps[]
}

// PostModal
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

// PostFeed
export interface PostFeedInterface {
  id: number
  image: string
  name: string
  title: string
  location: string
  date: string
  likes: string
}