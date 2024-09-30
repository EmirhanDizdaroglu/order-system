# Order System Projesi

Bu proje, bir sipariş yönetim sistemi olarak geliştirilmiştir. Kullanıcıların ürün eklemesi, sipariş oluşturması, sipariş durumlarını takip etmesi ve siparişlerin mesaj kuyruğu aracılığıyla işlenmesi işlemleri yapılmaktadır. Proje, **React** ile frontend, **C# .NET Core** ile backend, **MySQL** veritabanı ve **RabbitMQ** ile mesaj kuyruklama sistemini kullanmaktadır.

## İçindekiler

- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Kurulum](#kurulum)
- [Karşılaşılan Problemler ve Çözümleri](#karşılaşılan-problemler-ve-çözümleri)
- [Kullanılan Paketler](#kullanılan-paketler)
- [Kullanılan Kaynaklar](#kullanılan-kaynaklar)

---

## Kullanılan Teknolojiler

### Frontend:

- **React**: Kullanıcı arayüzünün oluşturulmasında kullanıldı.
- **Axios**: Frontend'de backend ile iletişim kurmak için kullanıldı.
- **Material UI**: UI bileşenleri ve stil yönetimi için kullanıldı.

### Backend:

- **C# .NET Core**: Backend API'yi oluşturmak için kullanıldı.
- **MySQL**: Veritabanı yönetimi için kullanıldı.
- **RabbitMQ**: Siparişlerin işlenmesi için mesaj kuyruğu sağlandı.

### Geliştirme Ortamı:

- **Visual Studio Code**: Geliştirme editörü olarak kullanıldı.

---

### Gereksinimler:
- **React** ve **npm** (Frontend için)
- **C# .NET Core SDK** (Backend için)
- **MySQL** (Veritabanı için)
- **RabbitMQ** (Mesajlaşma sistemi için)
- **Docker** (Tüm bileşenleri çalıştırmak için)

## Kullanılan Paketler

### Backend:

- **Microsoft.EntityFrameworkCore**: .NET Core'da veritabanı işlemleri için kullanılan bir ORM (Object-Relational Mapping) aracıdır.
- **Pomelo.EntityFrameworkCore.MySql**: Entity Framework Core'un MySQL veritabanı ile çalışmasını sağlayan sağlayıcı.
- **RabbitMQ.Client**: RabbitMQ ile mesaj kuyruğu entegrasyonunu sağlamak için kullanılan kütüphane.
- **Newtonsoft.Json**: JSON verilerini serileştirmek ve ayrıştırmak için kullanılan popüler kütüphane.
- **Swashbuckle.AspNetCore**: Swagger dokümantasyonunu oluşturmak ve API'yi test etmek için kullanılan paket.
- **Microsoft.AspNetCore.Mvc**: Web API geliştirmek ve HTTP isteklerini işlemek için ASP.NET Core'da kullanılan temel paket.
- **Microsoft.Extensions.DependencyInjection**: Dependency Injection (DI) işlemlerini yönetmek için kullanılan paket.
- **Microsoft.Extensions.Hosting**: Arka planda çalışan servislerin yönetimi ve barındırılması için kullanılır.
- **MySqlConnector**: MySQL veritabanı ile bağlantı kurmak ve işlem yapmak için kullanılan kütüphane.
- **Microsoft.AspNetCore.Builder**: Middleware pipeline yönetimi için kullanılan kütüphane.
- **Microsoft.AspNetCore.Cors**: CORS (Cross-Origin Resource Sharing) yönetimi için kullanılan ASP.NET Core bileşeni.
- **Microsoft.Extensions.Configuration**: Uygulama yapılandırma ayarlarını yönetmek için kullanılan kütüphane.


### Frontend:

- **Axios**: HTTP istekleri yapmak için kullanılan popüler kütüphane.
- **react-router-dom**: React uygulamalarında sayfa yönlendirme (routing) işlemleri için kullanılan kütüphane.
- **@mui/material**: React uygulamaları için modern ve esnek kullanıcı arayüzü bileşenleri sunan kütüphane.
- **react**: Kullanıcı arayüzü bileşenleri oluşturmak için kullanılan ana kütüphane.
- **react-dom**: React bileşenlerini DOM'a bağlamak için kullanılan kütüphane.
- **react-scripts**: React projelerinde geliştirici araçları ve betikler sağlamak için kullanılan kütüphane.
- **@emotion/react**: CSS-in-JS (CSS ile JavaScript) yaklaşımı ile stil oluşturmak için kullanılan kütüphane.
- **@emotion/styled**: Styled Components ile benzer bir şekilde stilleri yönetmek için kullanılan kütüphane.

## Kurulum

### Adımlar:

1. **Proje deposunu klonlayın:**
    ```bash
    git clone https://github.com/EmirhanDizdaroglu/ordersystem.git
    cd ordersystem
    ```

2. **Backend'i başlatın:**
    ```bash
    cd backend
    dotnet restore
    dotnet run
    ```

3. **Frontend'i başlatın:**
    ```bash
    cd frontend
    npm install
    npm start
    ```

4. **Veritabanını çalıştırın:**
    MySQL'i kurun ve `appsettings.json` dosyasında veritabanı bağlantı ayarlarını yapılandırın.
   "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=orderdb;User=root;Password=password;"
}
  -*Veritabanını oluşturmak için:*
     dotnet ef database update


5. **RabbitMQ'yu çalıştırın:**
    RabbitMQ'yu kurun ve yönetim paneline şu adresle erişin:
    ```bash
    http://localhost:15672
    ```
    - **Kullanıcı adı:** `guest`
    - **Şifre:** `guest`

6. **Frontend'e erişin:**
    ```bash
    http://localhost:3000
    ```

7. **Backend API'sine erişin:**
    ```bash
    http://localhost:5000/
    ```
8. **Projeyi Docker ile çalıştırma:**
    ```bash
    docker-compose up --build

    ```

## Karşılaşılan Problemler ve Çözümleri

Proje geliştirme sürecinde karşılaştığım başlıca sorunlar ve çözümler aşağıda açıklanmıştır:

### 1. React `useEffect` ile API Verisi Çekilememe Problemi
- **Sorun**: `useEffect` kullanırken yanlış konumlandırma nedeniyle API'den veri çekilemedi.
- **Çözüm**: `useEffect` ve `useState` hook'ları doğru şekilde konumlandırıldı, böylece API çağrıları başarıyla gerçekleştirildi.

### 2. Backend'de API Çalıştırırken Swagger Kurulumu
- **Sorun**: API endpoint'lerini test etmek için Swagger yapılandırılmamıştı.
- **Çözüm**: Swagger, **Swashbuckle** paketi ile entegre edilerek API endpoint'leri test edildi.

### 3. MySQL İsimlendirme Uyumsuzlukları
- **Sorun**: MySQL veritabanındaki tablo ve model isimlendirmeleri arasında PascalCase ve snake_case uyumsuzluğu vardı.
- **Çözüm**: Model ve veritabanı isimlendirmeleri PascalCase ve snake_case uyumlu hale getirildi.

### 4. RabbitMQ Kuyruğunda 'PRECONDITION_FAILED' Hatası
- **Sorun**: RabbitMQ kuyruğunda 'durable' parametresindeki uyumsuzluk nedeniyle **PRECONDITION_FAILED** hatası oluştu.
- **Çözüm**: RabbitMQ kuyruğu doğru parametrelerle (durable=true) yeniden tanımlandı.

### 5. GET ve POST İsteklerinde 404 Hatası
- **Sorun**: Frontend ve backend arasındaki API isteklerinde 404 hatası alındı.
- **Çözüm**: API rotaları kontrol edildi ve gerekli yönlendirmeler doğru şekilde yapılandırıldı.

### 6. Entity Framework Core Migrations Sorunları
- **Sorun**: Entity Framework Core ile MySQL veritabanında migration işlemleri sırasında hatalar alındı.
- **Çözüm**: `Add-Migration` ve `Update-Database` komutları kullanılarak migration'lar başarılı şekilde uygulandı.

### 7. Postman ile PUT İsteklerinde Sorun
- **Sorun**: Postman üzerinden PUT isteği gönderildiğinde hata oluşuyordu.
- **Çözüm**: Backend tarafında POST metodunun düzgün çalışacak şekilde yapılandırılmasıyla sorun giderildi.
-  
### 8. API'den Veri Çekme (CORS Sorunu):
- **Sorun**: Frontend ile backend arasında CORS hataları yaşandı.
- **Çözüm**: Backend'de CORS yapılandırması doğru şekilde düzenlenerek frontend isteklerine izin verildi.

### 9. CSS ve Material UI ile Stillerin Uygulanmasında Sorunlar:
- **Sorun**: CSS ve Material UI ile stiller arasında uyuşmazlıklar yaşandı.
- **Çözüm**: Material UI bileşenleri ve CSS stilleri uygun şekilde düzenlendi

### 10. 'Invalid Order Data' ve POST Hataları:
- **Sorun**: Frontend'den gönderilen sipariş verilerinde geçersizlik hataları alındı.
- **Çözüm**: Backend'deki modeller ve frontend'deki veriler doğru şekilde yapılandırılarak, POST istekleri sorunsuz şekilde çalıştırıldı.

### 11. Tecrübe:
- **Sorun**: Bu projeyi geliştirirken daha önce tecrübe etmediğim .NET, C#, Docker, Material UI ve RabbitMQ gibi   teknolojilerle çalıştım. Bu teknolojilerle ilk kez çalıştığım için çeşitli zorluklar yaşadım.
- **Çözüm**: Bu süreç bana yeni beceriler kazandırdı ve mevcut teknik bilgi seviyemi geliştirdi.Kaynaklara bakarak adım adım ilerledim.

## Resources:

## Kullanılan Teknolojiler

- **[React](https://reactjs.org/):**  
  Kullanıcı arayüzünü oluşturmak için kullanılan bir JavaScript kütüphanesi.

- **[C# .NET Core](https://docs.microsoft.com/en-us/dotnet/core/):**  
  Backend API'yi geliştirmek için kullanılan framework.

- **[MySQL](https://www.mysql.com/):**  
  Veritabanı yönetim sistemi.

- **[RabbitMQ](https://www.rabbitmq.com/):**  
  Mesaj kuyruklama sistemi, siparişlerin işlenmesi için kullanılıyor.

- **[Docker](https://www.docker.com/):**  
  Uygulamaları konteynerize etmek ve geliştirme ortamlarını yönetmek için kullanılan bir platform.

- **[Material UI](https://mui.com/):**  
  React için hazır stil ve UI bileşenleri sağlayan bir kütüphane.

## Kullanılan Paketler

### Backend:
- **[Microsoft.EntityFrameworkCore](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore/):**  
  .NET Core için Object-Relational Mapping (ORM) aracı.
  
- **[Pomelo.EntityFrameworkCore.MySql](https://www.nuget.org/packages/Pomelo.EntityFrameworkCore.MySql/):**  
  Entity Framework Core'un MySQL için kullanılan sağlayıcısı.
  
- **[RabbitMQ.Client](https://www.nuget.org/packages/RabbitMQ.Client/):**  
  RabbitMQ ile entegrasyon sağlamak için kullanılan .NET kütüphanesi.
  
- **[Newtonsoft.Json](https://www.nuget.org/packages/Newtonsoft.Json/):**  
  JSON serileştirme ve deserializasyon için kullanılan popüler bir .NET kütüphanesi.

### Frontend:
- **[Axios](https://axios-http.com/):**  
  HTTP isteklerini yönetmek için kullanılan bir kütüphane.

- **[react-router-dom](https://reactrouter.com/):**  
  React uygulamasında sayfalar arası yönlendirme yapmak için kullanılan kütüphane.

- **[@mui/material](https://mui.com/components/):**  
  React için kullanıma hazır Material UI bileşenlerini sağlar.

## Ek Kaynaklar ve Öğrenme Dökümanları

Bu proje sırasında öğrendiğim ve faydalandığım bazı kaynaklar:

- [.NET Core Documentation](https://docs.microsoft.com/en-us/dotnet/core/)
- [Entity Framework Core Documentation](https://docs.microsoft.com/en-us/ef/core/)
- [Material UI Documentation](https://mui.com/)
- [RabbitMQ Documentation](https://www.rabbitmq.com/documentation.html)

### İzlediğim Video
Bu proje sırasında faydalandığım video:
- [RabbitMQ ve .NET Entegrasyonu](https://www.youtube.com/watch?v=V9DWKbalbWQ&ab_channel=TechnicalBabaji)


### Ek Açıklamalar:
1. **Kurulum Adımları**: Proje için gerekli olan tüm adımları listeledim. Hem backend hem de frontend için açıklamalar ekledim.
2. **Karşılaşılan Problemler**: Karşılaştığım problemlerin kısa açıklamalarını ekledim ve çözümlerini yazdım.
3. **Paketler ve Teknolojiler**: Kullandığım tüm paketleri ve teknolojileri özetledim.
4. **İletişim**: mail: dizdarogluemirhan@gmail.com
5. **Kaynaklar**: Kullandığım kaynakları liseledim.
