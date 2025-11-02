import { GoogleGenAI, Type } from "@google/genai";

// Fallback data in case of API key absence or API failure
const fallbackPosts: Omit<import('../types').Post, 'id' | 'timestamp'>[] = [
    { userId: "digital-artist", username: "فنان رقمي", avatarUrl: "https://picsum.photos/seed/art/48", content: "الفن هو الطريقة التي نقول بها ما لا نستطيع قوله. كل لوحة هي قصة تنتظر من يقرأها. #فن #إبداع" },
    { userId: "nature-explorer", username: "مستكشف الطبيعة", avatarUrl: "https://picsum.photos/seed/nature/48", content: "لا يوجد واي فاي في الغابة، لكنك ستجد اتصالًا أفضل. قضيت اليوم في أحضان الطبيعة، شعور لا يوصف بالسلام. 🌲 #طبيعة #هدوء" },
    { userId: "tech-expert", username: "خبير تقني", avatarUrl: "https://picsum.photos/seed/tech/48", content: "الذكاء الاصطناعي يتطور بسرعة مذهلة! ما هو أكثر تطبيق للذكاء الاصطناعي أثار إعجابكم مؤخرًا؟ شاركوني آرائكم. #تقنية #مستقبل" },
    { userId: "coffee-lover", username: "ذواقة القهوة", avatarUrl: "https://picsum.photos/seed/coffee/48", content: "رائحة القهوة في الصباح هي بداية مثالية ليوم مليء بالإنجازات. كيف تفضلون قهوتكم؟ ☕ #قهوة #صباح_الخير" },
    { userId: "travel-enthusiast", username: "عاشق السفر", avatarUrl: "https://picsum.photos/seed/travel/48", content: "السفر يفتح العقل ويجدد الروح. التخطيط للوجهة القادمة... هل لديكم أي اقتراحات؟ ✈️ #سفر #مغامرة" }
];


export async function generateSamplePosts(): Promise<Omit<import('../types').Post, 'id' | 'timestamp'>[]> {
  // Assume process.env.API_KEY is configured in the environment
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("API_KEY environment variable not set. Serving fallback content.");
    return fallbackPosts;
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 5 sample social media posts in Arabic. Topics can include technology, art, daily life, and nature. For each post, provide a creative Arabic username, a unique user ID slug based on the username, and a unique placeholder image URL from picsum.photos.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              userId: {
                type: Type.STRING,
                description: 'A unique user ID, like a slug from the username (e.g., "digital-artist").',
              },
              username: {
                type: Type.STRING,
                description: 'اسم مستخدم عربي إبداعي.',
              },
              avatarUrl: {
                type: Type.STRING,
                description: 'A placeholder image URL from `https://picsum.photos/seed/{random}/48` format.',
              },
              content: {
                type: Type.STRING,
                description: 'محتوى المنشور باللغة العربية.',
              },
            },
            required: ["userId", "username", "avatarUrl", "content"],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const posts = JSON.parse(jsonText);
    return posts;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return fallbackPosts;
  }
}