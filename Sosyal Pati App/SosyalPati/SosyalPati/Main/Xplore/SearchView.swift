
import SwiftUI

struct SearchView: View {
    @Binding var show: Bool
    @State private var hedefSehir = ""
    var body: some View {
        
        Button{
            withAnimation(.snappy){
                show.toggle()
            }
        }label: {
            Image(systemName: "xmark.circle")
                .imageScale(.large)
                .foregroundStyle(.black)
        }
        
        
        
        
        VStack(alignment: .leading){
            Text("Şehir Seçin")
                .font(.title2)
                .fontWeight(.semibold)
            
            HStack{
                Image(systemName: "magnifyingglass")
                    .imageScale(.small)
                
                
                TextField("Bulunduğunuz Şehirde Arama Yapın", text: $hedefSehir)
                    .font(.subheadline)
            }
            .frame(height: 44)
            .padding(.horizontal)
            .overlay{
                RoundedRectangle(cornerRadius: 8)
                    .stroke(lineWidth: 1.0)
                    .foregroundStyle(Color(.systemGray4))
            }
        }
        .padding()
        .background(.white)
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .padding()
        .shadow(radius: 10)
    }
}

#Preview {
    SearchView(show: .constant(false))
}
