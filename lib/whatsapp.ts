export const whatsappNumber = "6285887836384";

export type WhatsappIntent = "hire" | "career" | "collaborate" | "speaking" | "general";

export const whatsappMessage = (intent: WhatsappIntent) => {
  const messages: Record<WhatsappIntent, string> = {
    hire: "Halo Yusuf, saya tertarik untuk hire/engage Anda. Saya menemukan profil Anda melalui website. Kebutuhan/project saya: [jelaskan singkat]. Target mulai: [tanggal]. Budget/kisaran: [opsional].",
    career: "Halo Yusuf, saya [nama] dari [perusahaan]. Saya menemukan profil Anda melalui website dan ingin membahas peluang karier/role [nama posisi]. Lokasi/format: [onsite/hybrid/remote]. Tahap proses saat ini: [tahap].",
    collaborate: "Halo Yusuf, saya tertarik mengajak Anda berkolaborasi. Saya menemukan profil Anda melalui website. Bentuk kolaborasi: [jelaskan]. Tujuan/nilai yang ingin dicapai: [jelaskan]. Target waktu: [tanggal].",
    speaking: "Halo Yusuf, saya ingin mengundang Anda untuk speaking/content/knowledge-sharing. Acara/platform: [nama]. Topik: [topik]. Tanggal: [tanggal]. Format/durasi: [format].",
    general: "Halo Yusuf, saya menemukan profil Anda melalui website dan ingin terhubung. Keperluan saya: [jelaskan singkat].",
  };

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messages[intent])}`;
};
