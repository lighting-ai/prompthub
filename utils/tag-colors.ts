// Map of tag names to their color classes
const tagColorMap: Record<string, string> = {
  // Development tags
  react: "bg-blue-500 text-white",
  typescript: "bg-blue-700 text-white",
  javascript: "bg-yellow-500 text-black",
  nextjs: "bg-black text-white",
  tailwind: "bg-cyan-500 text-white",
  css: "bg-purple-500 text-white",
  html: "bg-orange-500 text-white",
  webdev: "bg-blue-600 text-white",
  fullstack: "bg-indigo-600 text-white",
  generator: "bg-violet-600 text-white",
  coding: "bg-slate-700 text-white",

  // Content tags
  writing: "bg-green-600 text-white",
  blog: "bg-emerald-500 text-white",
  content: "bg-teal-500 text-white",
  seo: "bg-green-700 text-white",

  // Design tags
  design: "bg-pink-500 text-white",
  product: "bg-rose-500 text-white",
  "3d": "bg-fuchsia-500 text-white",

  // Business tags
  marketing: "bg-red-500 text-white",
  business: "bg-amber-600 text-white",
  ecommerce: "bg-orange-600 text-white",
  productivity: "bg-lime-600 text-white",

  // Career tags
  interview: "bg-sky-600 text-white",
  career: "bg-blue-500 text-white",
  coaching: "bg-indigo-500 text-white",
  education: "bg-purple-600 text-white",
}

// Get color for a tag, with fallback
export function getTagColor(tag: string): string {
  const normalizedTag = tag.toLowerCase()
  return tagColorMap[normalizedTag] || "bg-gray-600 text-white" // Default fallback
}

// Get a list of all available tags with their colors
export function getAllTags(): { name: string; color: string }[] {
  return Object.entries(tagColorMap).map(([name, color]) => ({ name, color }))
}
