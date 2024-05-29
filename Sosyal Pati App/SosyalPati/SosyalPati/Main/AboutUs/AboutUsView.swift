import SwiftUI

struct AboutUsView: View {
    var body: some View {
        ScrollView {
            Image("SosyalPatiLogo")
                .resizable()
                .frame(width: 150,height: 150)
            VStack(alignment: .leading, spacing: 20) {
                
                Text("Hakkımızda")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                
                Text("Sosyal Pati projesi, evcil hayvan sahiplerinin evcil hayvanlarına uygun eşleşmeler bulmalarına yardımcı olurken, evcil hayvanlarının refahını da artırmaya çalışıyor. Evcil hayvan sahiplerinin ihtiyaçlarını karşılayan, evcil hayvanlarının yaşamlarının mutluluğuna ve sağlıklı olmasına katkıda bulunan bir platform oluşturmayı amaçlamaktadır.")
                    .font(.body)
                
                
                
                
                Text("Proje, evcil hayvan sahiplerine evcil hayvanlarına uygun refakatçiler bulma konusunda yardımcı olmayı amaçlıyor. Bu, evcil hayvanların belirli özelliklerine uygun olarak sosyal ihtiyaçlarını karşılayan eşleşmelerin bulunmasını içerir. Evcil hayvan sahiplerine, evcil hayvanlarının sağlığını ve refahını artıracak kaynaklara kolay erişim sağlamak. Bu, evcil hayvanlar için sağlıklı bir yaşam tarzını sürdürmek için hayati önem taşıyan temel bilgilerin sunulmasını içerir. Veteriner Kullanıcıların yakındaki veteriner kliniklerini ve doktorları kolayca bulmasını sağlamak. Bu, acil durumlarda hızlı erişim sağlar ve düzenli sağlık kontrollerinin yapılmasını kolaylaştırır.")
                    .font(.body)
            }
            .padding()
        }
        .navigationTitle("Hakkımızda")
    }
}

struct AboutUsView_Previews: PreviewProvider {
    static var previews: some View {
        AboutUsView()
    }
}
