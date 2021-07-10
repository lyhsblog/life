/**
 * @file comment helper
 * @author Surmon <https://github.com/surmon-china>
 */

import { email as emailRegex } from '../../constants/regex'
import { scrollTo } from '../../utils/scroller'

export const EMOJIS = [
  '😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡', '😤', '😭', '😱',
  '😳', '😵', '🌚', '🙏', '👆', '👇', '👌', '🤘', '👍', '👎', '💪', '👏', '🌻', '🌹', '💊',
  '🇨🇳', '🇺🇸', '🇯🇵 ', '🚩', '🐶', '❤️', '💔', '💩', '👻'
]

export const CommentEvent = {
  Reply: 'reply',
  Like: 'like',
  Sort: 'sort',
  Page: 'page',
  CancelReply: 'cancel-reply',
  SyncProfile: 'update:profile',
  SaveProfile: 'save-profile',
  EditProfile: 'edit-profile',
  ClearProfile: 'clear-profile',
  CancelProfile: 'cancel-profile',
  TogglePreview: 'toggle-preview',
  Submit: 'submit'
}

export const ElementID = {
  Warpper: 'comment-warpper',
  Publisher: 'comment-publisher',
}

export const getCommentElementId = (commentId) => {
  return `comment-item-${commentId}`
}

export const humanizeGravatarUrlByEmail = (email) => {
  return emailRegex.test(email)
    ? '/images/comment/anonymous.jpg'
    : '/images/comment/anonymous.jpg'
}

export const scrollToElementAnchor = (elementId, offset = 0) => {
  const targetElement = document.getElementById(elementId)
  if (targetElement) {
    scrollTo(targetElement, 200, { offset })
  }
}
