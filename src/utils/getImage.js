// src/utils/getImage.js
export function getImage(filename) {
  if (!filename) return null
  
  try {
    // Dynamically import image from assets
    return new URL(`../assets/img/${filename}`, import.meta.url).href
  } catch (e) {
    console.warn(`Image not found: ${filename}`)
    return null
  }
}