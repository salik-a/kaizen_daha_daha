const tr = {
  common: {
    ok: "Tamam!",
    cancel: "İptal",
    back: "Geri Git",
  },
  errorScreen: {
    title: "Bir şeyler yanlış gitti!",
    friendlySubtitle: "Bizden kaynaklı bir hata oluştu lütfen tekrar deneyiniz.",
    reset: "UYGULAMAYI YENİDEN BAŞLAT",
  },
  emptyStateComponent: {
    generic: {
      heading: "Burası boş",
      content:
        "Henüz veri bulunamadı. Uygulamayı yenilemek veya yeniden yüklemek için düğmeye tıklamayı deneyin.",
      button: "Lütfen tekrar dene",
    },
  },
  tabBarNavigator: {
    discover: "KEŞFET",
    wallet: "DAHA CÜZDAN",
  },
}

export default tr
export type Translations = typeof tr
