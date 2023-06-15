# Başlıklar
- [Özellikler](#özellikler)
- [Uygulama Görselleri](#uygulama-görselleri)
- [Kullanılan Teknolojiler](#Kullanılan-Teknolojiler)
### [Web sitesi](https://167.71.54.93)


# Deprem Sonrası Acil Durum Yönetimi Uygulaması

Bu proje, deprem sonrasında alandaki binaların durumunun ve uğradıkları zararın tespit edilerek acil müdahale ve sağlık ekiplerinin yönlendirilmesi için done sağlamak amacıyla geliştirilmiştir. Proje kapsamında, binaların zarar durumunu fotoğraf ve videolarla birlikte harita üzerinde gösteren bir uygulama yazılacaktır. Ayrıca, kullanıcılar tarafından yapılan veri girişleri ile bu bilgiler teyit edilecek ve güvenilirlik seviyeleri hesaplanarak gösterilecektir.


## Özellikler

- Bina Durumu Gösterimi:

Kullanıcılar, binaların zarar durumunu harita üzerinde görebilirler.
Yıkımın şekli, yangın durumu, gaz ve su sızıntısı, tüp gaz olup olmaması, çatı, kat, merdiven, asansör, duvar, kolon, tablaların durumu gibi bilgileri girebilirler.
- Kurtarma ve Sağlık Durumu Bilgileri:

Kullanıcılar, deprem sırasında içeride olan kişilerin sayısı, yıkıldıktan sonra içeride kalan kişilerin sayısı, kurtarılan kişilerin bilgileri, ölü ve yaralı sayısı gibi bilgileri girebilirler.
- Güvenilirlik Hesaplama:

Veri girişlerinin güvenilirliği, kullanıcıların geri bildirimleri, puanlamaları ve yetkili onayı gibi faktörlere dayalı olarak hesaplanır.
Güvenilir olmayan verilerin yanıltıcı bilgilere sebep olması engellenir.

- Hızlı Müdahale:
 
 Ekipler haritada ilgili olay bildirilerini ve içeriklerini görerek, ihtiyaca göre personel tesis edebilirler.

 - Kişi Arama:

Depremzede yakınları, ulaşım sağlayamadığı yakınlarını uygulama içinde arayabilir, harita üzerinde herhangi bir veri içerisinde Ad, Soyad, T.C numarası girildi ise, durumunu öğrenebilirler.

  
## Uygulama Görselleri

### 1) Uygulama yetkili girişi
Yetkili olarak giriş için daha önceden size verilmiş bir password bilgisi gereklidir. Bunun için bir devlet kurumuna bağlı olmanız simüle edilerek dizayn edilmiştir.
Yetkili giriş yapanlar harita üzerinde ki bildirilmiş olay işaretleri için bir güvenilirlik puanlaması yapabilirler.

![image](https://github.com/bugraYvz99/earthquake-emergency-app/assets/105501911/3ae7f7d6-56da-4ad5-8a43-49c1ad594e21)


 ### 2) Uygulama gönüllü  girişi

 Gönüllü Giriş yapmak için sadece telefon numarası girmek yeterlidir. Ad ve Soyad isteğe bağlıdır. Telefon numaranız adınız ve soyadınız ile giriş yaptığınızda , daha sonra ki girişlerinizde sadece telefon numaranızı girerseniz adınız ve soyadınız tanınacaktır.
 
![image](https://github.com/bugraYvz99/earthquake-emergency-app/assets/105501911/09785694-3616-4219-b082-c4c470b91767)

 ### 3) Ana sayfa
 
 Ana sayfada ki Carousel üzerinden herhangi bir sayfaya geçiş yapılabilir;
 
![image](https://github.com/bugraYvz99/earthquake-emergency-app/assets/105501911/901e8c77-71d0-48ac-b6c1-d44513ebd2dc)

Yada menü kullanılabilir;

![image](https://github.com/bugraYvz99/earthquake-emergency-app/assets/105501911/78e155b9-436b-4604-adba-50f9c2b7c871)

 ### 3) Olay bildir sayfası
 
 Burada karşımıza bir harita çıkıyor, bu haritanın üzerine tıklanarak bir durum bildirebiliriz;
 
![image](https://github.com/bugraYvz99/earthquake-emergency-app/assets/105501911/c1223e4e-9bdd-4ee7-989f-a8334f0a6a4f)

![image](https://github.com/bugraYvz99/earthquake-emergency-app/assets/105501911/703eadef-5f42-4988-afb5-2a0fc363d6f3)

![image](https://github.com/bugraYvz99/earthquake-emergency-app/assets/105501911/ddfa9d53-8dcb-4c8d-8679-2baa5698999f)

3 tip olay bildirilebilir ;
- Yangın 
- Gaz kaçağı
- Deprem ve genel hasar bilgisi

Bütün bunlarla birlikte yangında yaralanmış, depremde enkaz altında kalmış gibi bilgiler girilebilir,
Ayrıca insanlara ait kimlik bilgileri de yakınlarının bulabilmesi amacıyla girilebilir.

![image](https://github.com/bugraYvz99/earthquake-emergency-app/assets/105501911/052e9329-f0f1-474d-87d0-ff98a0abe056)

İşaretçi koyulduğunda haritada aşağıda ki görselde ki gibi gözükür;

![image](https://github.com/bugraYvz99/earthquake-emergency-app/assets/105501911/ed27486e-b793-4d1c-9125-bf67ae1ddb61)

İşaretçinin üzerine tıklanıldığında;

![image](https://github.com/bugraYvz99/earthquake-emergency-app/assets/105501911/d21edd6e-56ec-4b9c-ae32-62388dd8e2b9)

Detayları görüntüle butonu ile gelen detay sayfası;

![image](https://github.com/bugraYvz99/earthquake-emergency-app/assets/105501911/4e5ab3cf-c2f7-4f15-8240-42cd45879031)

Arama sayfasında görselde ki gibi, girilmiş bilgiler Olay tipine göre aranabilir. Burada ekiplerin olaylara öncelik vermesi ve çalışmaların hızlandırılması
amaçlanmıştır

![image](https://github.com/bugraYvz99/earthquake-emergency-app/assets/105501911/9fa65e8f-02e6-46f6-bfda-696848ccd6cf)

Aynı şekilde insanların yakınlarını görselde ki gibi arayıp durumlarını öğrenebilmesi de amaçlanmıştır.

![image](https://github.com/bugraYvz99/earthquake-emergency-app/assets/105501911/44f7ccca-cbe9-4f15-af34-d3c7acaeb25b)

## Kullanılan Teknolojiler

Uygulamada Google-Map api, Mantine, Tailwind.Css kullanılmıştır.

### Google Map
Google-Map Api uygulamada yalnızca Harita ve Yol tarifleri amacı ile kullanılmıştır.
Google-Map komponentlerinin import edilmesi;
```javascript
// Google map Komponentleri.
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
```

```javascript
// Google map api'si ile haritanın yüklenmesini gerçekleştiren Script.
  const { isLoaded: isApiLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDXUM99i5wpXdDa8fqqW18TtwHKrQYimyE",
    libraries
  })
```
```javascript
//Google Map'in ve içindeki Markerların Render olmasını sağlayan komponent 
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          onClick={handleMapClick}
          zoom={10}
        >
          {dbMarkers &&
            dbMarkers.map((marker, index) => (
              <Marker
                icon={{
                  url: "/earthquake.png",
                  scaledSize: new window.google.maps.Size(30, 30)
                }}
                key={index}
                position={marker.position}
                title={marker.address}
                onClick={() => handleMarkerClick(marker)}
              />
            ))}
```
            
            
### Mantine

Mantine, modern ve özelleştirilebilir React bileşenlerini sağlayan bir kütüphanedir. Projenizde hızlı ve güzel kullanıcı arayüzleri oluşturmak için kullanabilirsiniz. Mantine, geniş bir bileşen koleksiyonuna ve birçok farklı özelliğe sahiptir.
#### Kullanım amacı
Mantine, kullanıcı arayüzünüzü hızlı bir şekilde oluşturmanızı sağlar. Özelleştirilebilir bileşenlerle birlikte gelir ve tasarım dilinizi takip edebilirsiniz. Mantine, modern UI trendlerini takip eden ve en iyi performansı sunan bir yapıya sahiptir.

```javascript
// Mantine'nın projeye eklendiği kod
import { MantineProvider, Text } from "@mantine/core"
function App() {
  return (
    <div>
      <Provider store={store}>
        <MantineProvider
          theme={{ loader: "bars" }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Router />
        </MantineProvider>
      </Provider>
    </div>
  )
}
```

### PM2

Bu proje, uygulamanın yürütülmesini ve yönetimini sağlamak için PM2'yi (Process Manager 2) kullanmaktadır. PM2, Node.js uygulamaları için gelişmiş bir işlem yöneticisidir ve sunucu tarafı uygulamalarının güvenilir ve sorunsuz bir şekilde çalışmasını sağlar.

#### PM2 Nedir?

- **İşlem Yönetimi:** PM2, uygulamaları sürekli olarak çalıştırır ve izler. Arka planda birden çok işlemi yönetir, bu sayede uygulamanızın sürekli olarak erişilebilir olmasını sağlar.

- **Otomatik Yeniden Başlatma:** Arıza durumlarında veya çökmelerde PM2 otomatik olarak uygulamayı yeniden başlatır. Bu sayede uygulama kesintisiz olarak çalışmaya devam eder ve hataların hızlıca giderilmesi sağlanır.

- **Gelişmiş Günlükleme:** PM2, uygulama günlüklerini takip etmenizi sağlar. Gerçek zamanlı olarak hata ve hata ayıklama bilgilerini izleyebilirsiniz.

- **Yük Dengeleme ve Ölçeklenebilirlik:** PM2, gelen trafiği birden çok uygulama örneği arasında dağıtabilir. Bu sayede yük dengesi sağlanır ve kaynakların daha verimli kullanılması mümkün olur.

- **Kolay Dağıtım ve Güncelleme:** PM2 ile uygulamanızın güncellenmesi ve dağıtılması sorunsuzdur. Sıfır kesinti sürecini destekler, bu sayede kullanıcılara kesintisiz bir deneyim sunulur.

- Bu proje, Node.js ve Express.js framework'ü kullanarak geliştirilmiştir. Ayrıca, kullanıcı kimlik doğrulama ve yetkilendirme için JWT (JSON Web Token) yöntemini kullanmaktadır.

  

### Express ve JWT

- **Express.js Framework:** Bu proje, web uygulamasının hızlı ve verimli bir şekilde geliştirilmesi için Express.js framework'ünü kullanır. Express.js, minimal ve esnek yapısıyla web uygulamalarının oluşturulmasını kolaylaştırır.

- **Kullanıcı Kimlik Doğrulama ve Yetkilendirme:** Proje, kullanıcıların kimlik doğrulama sürecini yönetmek ve güvenli bir şekilde yetkilendirilmelerini sağlamak için JWT kullanır. JWT, güvenli bir şekilde kullanıcı bilgilerini depolamak ve kullanıcının oturum durumunu takip etmek için kullanılır.
  
- Bu projede JWT, kullanıcı kimlik doğrulama ve yetkilendirme süreçlerini yönetmek için kullanılır. Kullanıcı kaydı, girişi ve yetkilendirme işlemleri için JWT aşağıdaki adımları takip eder:

1. Kullanıcı kaydı yapılırken, kullanıcının girdiği bilgiler doğrulanır ve JWT oluşturulur.

2. Kullanıcı giriş yaptığında, sunucu tarafında kullanıcı bilgileri doğrulanır ve JWT oluşturulur.

3. Oluşturulan JWT, kullanıcıya bir token olarak verilir ve tarayıcının `localStorage` veya `sessionStorage` gibi mekanizmalarında saklanır.

4. Kullanıcı her istekte bu token'ı sunucuya gönderir ve sunucu tarafında doğrulama yapılır.

5. Yetkilendirme gerektiren isteklerde, sunucu JWT token'ını kontrol eder ve geçerliyse isteği işleme alır, aksi takdirde erişimi reddeder.


### Daha Fazla Bilgi

Daha fazla bilgi için Express.js ve JWT belgelerine başvurabilirsiniz:
- [PM2 belgelerine](https://pm2.keymetrics.io/) 
- [Express.js Dokümantasyonu](https://expressjs.com/)
- [JSON Web Token (JWT) İnternet Standardı](https://jwt.io/)
- [Mantine Dokümantasyonu](https://mantine.dev/)
- [Google API Dokümantasyonu](https://developers.google.com/maps?hl=tr)
