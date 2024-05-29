
import SwiftUI

struct LikedView: View {
    var body: some View {
        NavigationStack{
            VStack(alignment: .leading, spacing: 32){
                
                VStack(alignment: .leading, spacing: 4){
                    Text("Beğendiğin İlanları Görüntülemek için Giriş Yap")
                        .font(.headline)
                    
                    Text("İlanları giriş yaptığında beğenebilir,\ngörüntüleyebilir ve ekleyebilirsin")
                        .font(.footnote)
                }
                
                Button{
                    
                }label: {
                    Text("Giriş Yap")
                        .foregroundStyle(.white)
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .frame(width: 360, height: 48)
                        .background(.black)
                        .clipShape(RoundedRectangle(cornerRadius: 8))
                }
                Spacer()
                
            }
            .padding()
            .navigationTitle("Beğendiğin İlanlar")
        }
    }
}

#Preview {
    LikedView()
}
