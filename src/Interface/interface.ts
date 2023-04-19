// Chat
export interface ChatBubbleProps {
  text: string
  createdAt: Date
}
export interface ChatProps {
  id: number
  user: string
}

// ChatBubble
export interface SpeechBubbleProps {
  text: string
  position: 'left' | 'right'
  isUser: boolean
}
export interface MyComponentState {
  speechBubbleProps: SpeechBubbleProps[]
}

// MainBanner
export interface MainBannerInterface {
  readonly name: string
  readonly image: string
  readonly link: string
  readonly content: string
  readonly subContent: string
}

// PostFeed
export interface PostFeedInterface {
  readonly id: number
  readonly images: {
    url: string
    name: string
  }[]
  readonly name: string
  readonly title: string
  readonly location: string
  readonly date: string
  readonly likes: string
  readonly nickName: string
}

// PostDetail
export interface PostDetailInfoInterface {
  readonly id: number
  readonly images: {
    url: string
    name: string
  }[]
  readonly user: string
  readonly title: string
  readonly location: string
  readonly startDate: string
  readonly endDate: string
  readonly comment: string
  readonly likes: string
  readonly post: string
  readonly hashtags: string[]
  readonly comments: {
    nickName: string
    comment: string
    date: string
  }[]
}

// ChatList
export interface ChatListInterface {
  readonly id: number
  readonly user: string
  readonly message: string
  readonly date: string
  readonly profile: string
}
// users
export interface UserInterface {
  email: string
  password: string
  nickName: string
  myPage: {
    profile: string
    background: string
    ment: string
  }
}
