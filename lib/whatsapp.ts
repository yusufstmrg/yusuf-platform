export const whatsappNumber = "6285887836384";

export const whatsappMessage = (intent: "hire" | "collaborate" | "speaking" | "general") => {
  const messages = {
    hire: "Halo Yusuf, saya tertarik untuk hire/engage Anda. Saya menemukan profil Anda melalui website. Berikut kebutuhan saya: [jelaskan kebutuhan/posisi/project]. Target mulai: [tanggal]. Budget/kisaran: [opsional].",
    collaborate: "Halo Yusuf, saya tertarik mengajak Anda berkolaborasi. Saya menemukan profil Anda melalui website. Bentuk kolaborasi yang saya bayangkan: [jelaskan]. Nilai/tujuan kolaborasinya: [jelaskan].",
    speaking: "Halo Yusuf, saya ingin mengundang/berdiskusi mengenai speaking, content, atau knowledge-sharing. Acara/platform: [nama]. Topik: [topik]. Tanggal: [tanggal]. Format/durasi: [format].",
    general: "Halo Yusuf, saya menemukan profil Anda melalui website dan ingin terhubung. Keperluan saya: [jelaskan singkat].",
  } as const;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messages[intent])}`;
};
