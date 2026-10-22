// Team card content. Replace the placeholder portraits and links with final team assets.
import headImg from '../assets/team/head-placeholder.webp'
import memberImg from '../assets/team/member-placeholder.webp'

const links = { github: '#', linkedin: '#', instagram: '#' }

export const heads = Array.from({ length: 8 }, () => ({
  name: 'Johnny Blaze',
  role: 'UI/UX Designer',
  img: headImg,
  links,
}))

export const coHeads = Array.from({ length: 4 }, () => ({
  name: 'Victor Von Doom',
  role: 'UI/UX Designer',
  img: memberImg,
  links,
}))

export const members = Array.from({ length: 4 }, () => ({
  name: 'Victor Von Doom',
  role: 'UI/UX Designer',
  img: memberImg,
  links,
}))
