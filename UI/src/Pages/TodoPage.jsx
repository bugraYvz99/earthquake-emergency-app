import React from "react"
import { Paper, Text, Title, Badge, CheckIcon } from "@mantine/core"
const TodoPage = () => {
  const todoItems = [
    "Sakin olun ve panik yapmayın.",
    "Yere düşmek için hızla bir masa, masa altı veya sarsıntıya dayanıklı bir yapıya sığının.",
    "Balkonlardan, pencerelerden veya dışarıdan kaçın.",
    "Kapı ve pencereleri kapatın, elektrik ve gazı kapatın.",
    "Eşyaların düşmesini önlemek için kitaplıklar, dolaplar gibi mobilyaları sabitleyin.",
    "Asansörleri kullanmayın.",
    "Acil çıkış yollarını bilin ve kullanın.",
    "Telefon hatlarını serbest bırakın, acil durumlar için 112 veya 911 gibi acil numaraları arayın.",
    "Deprem sırasında açık alana çıkın ve elektrik hatlarından, ağaçlardan, direklerden ve binalardan uzak durun.",
    "Yardıma ihtiyacı olanlara yardım edin ve acil durum ekiplerinin talimatlarını izleyin."
  ]
  const earthquakeItems = [
    "Su (kişi başına en az 3 litre)",
    "Kuru gıda (konserve yiyecekler, bisküvi vb.)",
    "Battaniye",
    "El feneri ve yedek piller",
    "İlk yardım seti",
    "Tuvalet kağıdı ve ıslak mendil",
    "İletişim araçları (cep telefonu, pil, şarj cihazı)",
    "El radyosu",
    "Bıçak, çakı",
    "Kişisel hijyen ürünleri",
    "Doküman kopyaları (kimlik, pasaport, sigorta poliçeleri vb.)",
    "Para ve küçük bozukluklar",
    "Kişiye özel ilaçlar",
    "Mevsime uygun kıyafetler",
    "Kişisel belgeler ve önemli bilgiler",
    "Oyun ve eğlence malzemeleri (çocuklar için)"
  ]

  return (
    <div>
      <div className="max-w-xl mx-auto p-6">
        <Paper shadow="md" padding="lg">
          <Title order={1} style={{ marginBottom: "1.5rem" }}>
            Deprem Esnasında Yapılması Gerekenler
          </Title>
          <ul className="space-y-4">
            {todoItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                <Text className="w-5/6">{item}</Text>
              </li>
            ))}
          </ul>
        </Paper>
      </div>
      <div id="scroll-to-section" className="max-w-xl mx-auto p-6">
        <Paper shadow="md" padding="lg">
          <Title order={1} style={{ marginBottom: "1.5rem" }}>
            Deprem Çantasına Konması Gerekenler
          </Title>
          <ul className="space-y-4">
            {earthquakeItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckIcon
                  className="w-5 h-5 text-green-500 mr-2"
                  style={{ width: "1rem", height: "1rem" }}
                />
                <Text>{item}</Text>
              </li>
            ))}
          </ul>
        </Paper>
      </div>
    </div>
  )
}

export default TodoPage
